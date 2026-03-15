#include "userprog/syscall.h"
#include <stdio.h>
#include <syscall-nr.h>
#include "threads/interrupt.h"
#include "threads/thread.h"
#include "threads/vaddr.h"
#include "userprog/pagedir.h"
#include "threads/thread.h"
#include "devices/shutdown.h"
#include "devices/input.h"
#include "threads/synch.h"
#include "filesys/file.h"
#include "filesys/filesys.h"
#include "userprog/process.h"
#include "threads/palloc.h"
struct lock lock; /* synchronization for files */
static void syscall_handler (struct intr_frame *);
/* Initializes syscall_handler and lock */
void syscall_init (void)
{
  intr_register_int (0x30, 3, INTR_ON, syscall_handler, "syscall");
  lock_init (&lock);
}
/* Verifies addr as a valid user address that is mapped. Exits if invalid. */
static void validate_single_addr (const void *addr)
{ /* Brittney Driving */
  if (addr == NULL || !is_user_vaddr (addr)
      || pagedir_get_page (thread_current ()->pagedir, addr) == NULL)
    exit (-1);
} /* Done Driving */
/* Verifies user memory range [ADDR, ADDR + SIZE) as valid and mapped.
   Exits if any byte is invalid.  */
static void validate_addr_range (const void *addr, unsigned size)
{ /* Brittney Driving */
  if (size == 0)
    return;
  uintptr_t start_addr = (uintptr_t) addr;
  uintptr_t end_addr = start_addr + size - 1;
  uintptr_t curr_page = (uintptr_t) pg_round_down ((const void *) start_addr);
  if (start_addr >= (uintptr_t) PHYS_BASE
      || end_addr < start_addr
      || end_addr >= (uintptr_t) PHYS_BASE)
    exit (-1);
  validate_single_addr ((const void *) start_addr);
  curr_page += PGSIZE;
  while (curr_page <= end_addr)
    {
      validate_single_addr ((const void *) curr_page);
      curr_page += PGSIZE;
    }
} /* Done Driving */
/* Verifies a user string by checking only the pages it touches. */
static void validate_string (const char *str)
{
  const char *curr = str;
  const void *curr_page = pg_round_down (str);
  validate_single_addr (str);
  while (*curr != '\0')
    {
      curr++;
      if (pg_round_down (curr) != curr_page)
        {
          validate_single_addr (curr);
          curr_page = pg_round_down (curr);
        }
    }
}
/* Looks for fd and finds matching file_descriptor in the list. Returns
   corresponding file_descriptor if found. NULL otherwise. */
static struct file_descriptor *find_fd_mapping (int fd)
{ /* Weston Driving */
  struct thread *t = thread_current ();
  if (fd < 0 || fd >= 128 || t->fd_to_assign[fd] == 0)
    return NULL;
  /* iteraite through every element in fd_list */
  for (struct list_elem *curr_elem = list_begin (&t->fd_list);
        curr_elem != list_end (&t->fd_list); curr_elem = list_next (curr_elem))
    {
      struct file_descriptor *curr_file = list_entry (curr_elem,
                                                      struct file_descriptor,
                                                      elem);
      if (curr_file->fd == fd)
        return curr_file; /* found matching fd */
    }
  /* no matching fd */
  return NULL;
} /* Done Driving */
/* Brittney, Carlos, Taimur & Weston Driving Upcoming Section */
/* Powers off the machine. */
static void halt (void)
{
  shutdown_power_off ();
}
/* Terminates the current process with the given status. Stores status in
   exit_status, prints, and then exits. */
void exit (int status)
{
  struct thread *t = thread_current ();
  t->exit_status = status;
  printf ("%s: exit(%d)\n", t->name, status);
  thread_exit ();
}
/* Runs the user program file (command line) in a new process. Returns the
   new process id (tid) on success, pid_error on failure. */
static pid_t exec (const char *file)
{
  pid_t process_id = process_execute (file);
  return process_id;
}
/* Waits for process PID to terminate and returns its exit status. Returns -1
   if pid is not a child of the current process or wait was already performed
   for pid */
static int wait (pid_t pid)
{
  return process_wait ((tid_t) pid);
}
/* Creates a new file named file with initial size in bytes. Returns true on
   success, false on failure. */
static bool create (const char *file, unsigned initial_size)
{
  lock_acquire (&lock);
  bool success = filesys_create (file, initial_size);
  lock_release (&lock);
  return success;
}
/* Deletes the file named file Returns true on success, false on failure. */
static bool remove (const char *file)
{
  lock_acquire (&lock);
  bool success = filesys_remove (file);
  lock_release (&lock);
  return success;
}
/* Opens the file named file and installs it into the current process's file
   descriptor table. Returns the new file descriptor on success, or -1 on
   failure. */
static int open (const char *file)
{
  lock_acquire (&lock);
  struct file *f_opened = filesys_open (file);
  lock_release (&lock);
  if (f_opened == NULL)
    return -1; /* error opening file */

  struct thread *t = thread_current ();
  struct file_descriptor *file_entry = palloc_get_page (PAL_ZERO);
  int assigned_fd = -1;
  if (file_entry == NULL)
    {
      /* error allocating page, modifying file so need MUTEX */
      lock_acquire (&lock);
      file_close (f_opened);
      lock_release (&lock);
      return -1;
    }
  for (int fd = 2; fd < 128; fd++)
    {
      if (t->fd_to_assign[fd] == 0)
        {
          assigned_fd = fd;
          t->fd_to_assign[fd] = 1;
          break;
        }
    }
  if (assigned_fd == -1)
    {
      lock_acquire (&lock);
      file_close (f_opened);
      lock_release (&lock);
      palloc_free_page (file_entry);
      return -1;
    }
  /* populate file descriptor struct with fd & file */
  file_entry->fd = assigned_fd;
  file_entry->file = f_opened;
  /* add fd to proccess' fd_list */
  list_push_back (&t->fd_list, &file_entry->elem);
  return file_entry->fd;
}
/* Returns the size, in bytes, of the opened file, fd */
static int filesize (int fd)
{
  struct file_descriptor *file_entry = find_fd_mapping (fd);
  if (file_entry == NULL)
    /* invalid fd */
    return -1;
  lock_acquire (&lock);
  int size = file_length (file_entry->file);
  lock_release (&lock);
  return size;
}
/* Reads up to size bytes from fd into buffer. fd 0 reads from the keyboard.
   Returns the number of bytes read, or -1 on error. Terminates the process
   with exit (-1) if fd is invalid. */
static int read (int fd, void *buffer, unsigned size)
{
  if (fd == 1) /* not allowed to read from console */
    return -1;
  if (size == 0) /* nothing to read, not an error */
    return 0;
  if (fd == 0) /* For stdin, reading from keyboard */
    {
      uint8_t *byte_buffer = (uint8_t *) buffer;
      for (unsigned i = 0; i < size; i++)
        /* gets/reads individual chars from keyboard supplied by user */
        byte_buffer[i] = input_getc ();
      return (int) size;
    }
  struct file_descriptor *file_entry = find_fd_mapping (fd);
  if (file_entry == NULL)
    /* invalid fd */
    exit (-1);

  lock_acquire (&lock);
  int num_bytes_read = file_read (file_entry->file, buffer, size);
  lock_release (&lock);
  return num_bytes_read;
}
/* Writes up to size bytes from buffer to fd. fd 1 writes to the console.
   Returns the number of bytes written, or -1 on error. Terminates with
   exit (-1) if fd is invalid. */
static int write (int fd, const void *buffer, unsigned size)
{
  if (fd == 0) /* not allowed to write to keyboard */
    return -1;
  if (size == 0)
    return 0;
  if (fd == 1) /* For stdout, writing to console */
    {
      putbuf (buffer, size);
      return size;
    }
  struct file_descriptor *file_entry = find_fd_mapping (fd);
  if (file_entry == NULL)
    /* invalid fd */
    exit (-1);

  lock_acquire (&lock);
  int num_bytes_written = file_write (file_entry->file, buffer, size);
  lock_release (&lock);
  return num_bytes_written;
}
/* Changes the next byte to be read/written to the given position. Terminates
   the process with exit (-1) if fd is invalid. */
static void seek (int fd, unsigned position)
{
  struct file_descriptor* file_entry = find_fd_mapping (fd);
  if (file_entry == NULL)
    /* invalid fd */
    exit (-1);
  lock_acquire (&lock);
  file_seek (file_entry->file, position);
  lock_release (&lock);
}
/* Returns the current position in the opened file as fd. Terminates the
   process with exit (-1) if fd is invalid */
static unsigned tell (int fd)
{
  struct file_descriptor* file_entry = find_fd_mapping (fd);
  if (file_entry == NULL)
    /* invalid fd */
    exit (-1);
  lock_acquire (&lock);
  unsigned index = file_tell (file_entry->file);
  lock_release (&lock);
  return index;
}
/* Closes the fd in the current process, removes it from the fd table, and
   frees the associated descriptor entry. Terminates the process with exit (-1)
   if fd is invalid. */
static void close (int fd)
{
  struct thread *t = thread_current ();
  struct file_descriptor* file_entry = find_fd_mapping (fd);
  if (file_entry == NULL)
    /* invalid fd */
    exit (-1);
  /* take file off of process' list, then close */
  list_remove (&file_entry->elem);
  lock_acquire (&lock);
  file_close (file_entry->file);
  lock_release (&lock);
  t->fd_to_assign[fd] = 0;
  /* deallocate page, no longer needed */
  palloc_free_page (file_entry);
}
/* Done Driving Section */
/* Handles system calls for processes. Validates user pointers before
   dereferencing them, then calls corresponding syscall methods. Invalid
   syscall or pointer terminates process with exit (-1) */
static void syscall_handler (struct intr_frame *f)
{ /* Brittney, Carlos, Taimur, & Weston Driving */
    /* verify all 4 bytes of syscall_num, then dereference it */
    uint8_t *sp = (uint8_t *) f->esp;
    validate_addr_range (sp, 4);
    const int syscall_num = * (int *) sp;

    /* switch over system call types, call helper methods within cases */
    switch (syscall_num)
      {
        case (SYS_HALT):
          {
            halt ();
            break;
          }
        case (SYS_EXIT):
          {
            validate_addr_range (sp + 4, 4);
            int status = * (int *) (sp + 4);
            exit (status);
            break;
          }
        case (SYS_EXEC):
          {
            validate_addr_range (sp + 4, 4);
            char *cmd_line = * (char **) (sp + 4);
            validate_string (cmd_line);
            f->eax = exec (cmd_line);
            break;
          }
        case (SYS_WAIT):
          {
            /* validate pid */
            validate_addr_range (sp + 4, 4);
            pid_t pid = * (pid_t *) (sp + 4);
            f->eax = wait (pid);
            break;
          }
        case (SYS_CREATE):
        case (SYS_REMOVE):
        case (SYS_OPEN):
          {
            /* validate file pointer */
            validate_addr_range (sp + 4, 4);
            char *file = * (char **) (sp + 4);
            validate_string (file);
            /* SWITCH CASE INCEPTION!! */
            switch (syscall_num)
              {
                case (SYS_CREATE):
                  {
                    /* validate size */
                    validate_addr_range (sp + 8, 4);
                    unsigned size = * (unsigned *) (sp + 8);
                    f->eax = create (file, size);
                    break;
                  }
                case (SYS_REMOVE):
                  {
                    f->eax = remove (file);
                    break;
                  }
                default:
                  { /* case for SYS_OPEN */
                    f->eax = open (file);
                  }
              }
            break;
          }
        case (SYS_READ):
        case (SYS_WRITE):
          {
            /* validate fd, then buffer, then size */
            validate_addr_range (sp + 4, 4);
            int fd = * (int *) (sp + 4);
            validate_addr_range (sp + 8, 4);
            void *buffer = * (void **) (sp + 8);
            validate_addr_range (sp + 12, 4);
            unsigned size = * (unsigned *) (sp + 12);
            if (size > 0) /* validate everything in the buffer */
              validate_addr_range (buffer, size);
            f->eax = (syscall_num == SYS_READ) ? read (fd, buffer, size)
                                                 : write (fd, buffer, size);
            break;
          }
        case (SYS_FILESIZE):
        case (SYS_SEEK):
        case (SYS_TELL):
        case (SYS_CLOSE):
          {
            /* validate fd */
            validate_addr_range (sp + 4, 4);
            int fd = * (int *) (sp + 4);

            /* SWITCH INCEPTION!! */
            switch (syscall_num)
              {
                case (SYS_SEEK):
                  {
                    /* validate position */
                    validate_addr_range (sp + 8, 4);
                    unsigned position = * (unsigned *) (sp + 8);
                    seek (fd, position);
                    break;
                  }
                case (SYS_TELL):
                  {
                    f->eax = tell (fd);
                    break;
                  }
                case (SYS_FILESIZE):
                  {
                    f->eax = filesize (fd);
                    break;
                  }
                default: /* encompassing case for close */
                  {
                    close (fd);
                  }
              }
            break;
          }
        default: /* invalid system call (not found) */
          exit (-1);
      }
} /* Done Driving */
