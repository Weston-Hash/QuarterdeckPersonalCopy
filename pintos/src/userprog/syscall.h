#ifndef USERPROG_SYSCALL_H
#define USERPROG_SYSCALL_H
#include <list.h>
#include "filesys/file.h"
#include "threads/synch.h"
extern struct lock lock; /* global lock for file operations */
void syscall_init (void);
/* declared here so other kernel files, such as exception.c, can call
   without implicit declaration warnings */
void exit (int status);
struct file_descriptor
{
    int fd; /* fd # user sees */
    struct list_elem elem; /* allows fd to put in list */
    struct file *file; /* actual file object (kernel sees) */
};
#endif /* userprog/syscall.h */
