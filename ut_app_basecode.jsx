import { useState, useEffect, createContext, useContext } from "react";

// ─── AUTH ───────────────────────────────────────────────────
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);
// Permission helpers
// canEdit(user, "pt")       → true if user may edit PT plan
// canEdit(user, "leadlab")  → TRAINO + seniors
// canEdit(user, "chits")    → ADJ + seniors
// canEdit(user, "structure")→ ADJ + seniors
// canEdit(user, "potw")     → seniors only
// canEdit(user, "forms")    → seniors only
// canEdit(user, "academic") → academics billet + seniors
// "seniors" = BNCO, BNXO, OPS, all SELs

const SENIOR_ROLES = ["bn_cdr", "xo", "ops", "sel"];
const isSenior  = (u) => u && SENIOR_ROLES.includes(u.role);
const isCoC     = (u) => u && [...SENIOR_ROLES, "co_cdr", "plt_cdr", "adj"].includes(u.role);
const isBigFour = (u) => normalizeCompany(u?.company) === "BN" && ["bn_cdr", "xo", "ops", "sel"].includes(u?.role);

function canEdit(user, section) {
  if (!user) return false;
  if (isSenior(user)) return true;          // BNCO/BNXO/OPS/SEL edit everything
  switch (section) {
    case "pt":        return user.role === "pto";
    case "leadlab":   return user.role === "traino";
    case "chits":     return ["adj", "co_cdr", "plt_cdr"].includes(user.role);
    case "structure": return user.role === "adj";
    case "academic":  return user.role === "academics";
    case "forms":     return ["adj", "pto", "traino", "academics"].includes(user.role); // billets excl. PC/CC
    case "fitreps":   return ["adj", "co_cdr", "plt_cdr"].includes(user.role);
    default:          return false;
  }
}

const LEGACY_COMPANY_MAP = {
  Marines: "Alpha",
  "Navy Alpha": "Bravo",
  "Navy Bravo": "Charlie",
};

const COMPANY_META = {
  BN:      { short: "BN",      full: "BN" },
  Alpha:   { short: "Alpha",   full: "Alpha Company" },
  Bravo:   { short: "Bravo",   full: "Bravo Company" },
  Charlie: { short: "Charlie", full: "Charlie Company" },
};

const COMPANY_COLORS = {
  Alpha:   "#8B0000",
  Bravo:   "#003087",
  Charlie: "#B8860B",
};

const STRUCTURE_BILLET_ORDER = ["PTO", "ADJ", "SUPPO", "PAO", "TRAINO", "AO", "BGDO", "CGC", "AOPS"];

function normalizeCompany(company) {
  return LEGACY_COMPANY_MAP[company] || company;
}

function getCompanyShortName(company) {
  const normalized = normalizeCompany(company);
  return COMPANY_META[normalized]?.short || normalized;
}

function getCompanyFullName(company) {
  const normalized = normalizeCompany(company);
  return COMPANY_META[normalized]?.full || normalized;
}

function formatCompanyCoLabel(company) {
  const normalized = normalizeCompany(company);
  if (!normalized) return "—";
  return normalized === "BN" ? "BN" : `${getCompanyShortName(normalized)} Co`;
}

// Returns the profile descriptor shown under a member's name on the roster, e.g.:
//   Big Four → "BNCO" / "BNXO" / "OPS" / "SEL"
//   CC       → "Alpha Co · CC"
//   SEL      → "Alpha Co · SEL"
//   PC       → "Alpha Co · 1st PLT PC"
//   MIR/etc. → "Alpha Co · 1st PLT"
function getRosterDescriptor(user) {
  const company  = normalizeCompany(user.company);
  const coLabel  = formatCompanyCoLabel(company);
  // Big Four: title only, no company prefix
  if (company === "BN") {
    if (user.role === "bn_cdr") return "BNCO";
    if (user.role === "xo")     return "BNXO";
    if (user.role === "ops")    return "OPS";
    if (user.role === "sel")    return "SEL";
    return user.billet ? `BN · ${user.billet}` : "BN";
  }
  // CC and SEL
  if (user.role === "co_cdr") return `${coLabel} · CC`;
  if (user.role === "sel")    return `${coLabel} · SEL`;
  // Platoon ordinal: platoon field is "1st PC" / "2nd PC" — strip the " PC" suffix
  const pltOrdinal = (user.platoon || "").replace(/\s*(?:PC|PLT)$/i, "").trim();
  // PC
  if (user.role === "plt_cdr") {
    return pltOrdinal ? `${coLabel} · ${pltOrdinal} PLT PC` : `${coLabel} · PC`;
  }
  // MIR and all other billets
  if (pltOrdinal && pltOrdinal !== "CO" && pltOrdinal !== "SEL") {
    return `${coLabel} · ${pltOrdinal} PLT`;
  }
  return coLabel;
}

function getBilletLabel(user) {
  return (user.billet || (normalizeCompany(user.company) === "BN" ? user.platoon : "") || "").trim();
}

function normalizePlatoon(platoon) {
  const value = (platoon || "").trim().replace(/\s+/g, " ");
  if (!value) return "";
  const companyPrefixedPlatoon = value.match(/^[ABC]\s+(\d+(?:st|nd|rd|th))(?:\s*(?:PC|PLT))?$/i);
  if (companyPrefixedPlatoon) return `${companyPrefixedPlatoon[1]} PC`;
  if (/^(?:[ABC]\s+)?CC$/i.test(value) || /^CO$/i.test(value)) return "CO";
  if (/^(?:[ABC]\s+)?SEL$/i.test(value)) return "SEL";
  if (/^\d+(?:st|nd|rd|th)\s*PLT$/i.test(value)) return value.replace(/\s*PLT$/i, " PC");
  if (/^\d+(?:st|nd|rd|th)$/i.test(value)) return `${value} PC`;
  return value;
}

function formatPlatoonLabel(platoon) {
  const normalized = normalizePlatoon(platoon);
  if (!normalized) return "—";
  return /^\d+(?:st|nd|rd|th)\s*PC$/i.test(normalized) ? normalized.replace(/\s*PC$/i, " PLT") : normalized;
}

function getPlatoonSortValue(platoon) {
  const match = normalizePlatoon(platoon).match(/^(\d+)/);
  return match ? Number(match[1]) : 99;
}

const ROSTER_COMPANY_ORDER = ["BN", "Alpha", "Bravo", "Charlie"];
const BN_ROSTER_ASSIGNMENT_ORDER = ["BNCO", "BNXO", "OPS", "SEL", "PTO", "ADJ", "SUPPO", "PAO", "TRAINO", "AO", "BGDO", "CGC", "AOPS", "MIR"];
const COMPANY_ROSTER_ASSIGNMENT_ORDER = ["CO", "SEL", "1st PC", "2nd PC", "3rd PC", "4th PC", "MIR"];

function normalizePhone(phone) {
  return (phone || "").replace(/\D/g, "");
}

function getRosterAssignment(user) {
  const billet = getBilletLabel(user);
  if (billet) return billet;
  const platoon = normalizePlatoon(user.platoon);
  if (platoon === "CO" || user.role === "co_cdr") return "CO";
  if (platoon === "SEL" || user.role === "sel") return "SEL";
  if (platoon) return platoon;
  return "—";
}

function getRosterProfilePriority(user) {
  const platoon = normalizePlatoon(user.platoon);
  if (getBilletLabel(user)) return 100;
  if (user.role === "co_cdr" || platoon === "CO") return 80;
  if (user.role === "sel" || platoon === "SEL") return 70;
  if (user.role === "plt_cdr") return 60;
  return 0;
}

function getRosterAssignmentSort(user) {
  const assignment = getRosterAssignment(user);
  const order = normalizeCompany(user.company) === "BN" ? BN_ROSTER_ASSIGNMENT_ORDER : COMPANY_ROSTER_ASSIGNMENT_ORDER;
  const idx = order.indexOf(assignment);
  return idx === -1 ? order.length : idx;
}

function getRosterSectionLabel(company) {
  return company === "BN" ? "Big Four" : getCompanyFullName(company);
}

function getRosterAvatarStyle(company) {
  return {
    background: COMPANY_COLORS[company] || "#BF5700",
  };
}

function buildRosterEntries(userList) {
  const deduped = new Map();

  userList.forEach((user, index) => {
    const normalizedCompany = normalizeCompany(user.company);
    const dedupeKey = normalizePhone(user.phone) || `${user.name}|${(user.email || "").toLowerCase()}|${normalizedCompany}|${user.platoon}`;
    const current = deduped.get(dedupeKey);

    if (!current) {
      deduped.set(dedupeKey, { user, index });
      return;
    }

    const currentPriority = getRosterProfilePriority(current.user);
    const nextPriority = getRosterProfilePriority(user);

    if (nextPriority > currentPriority || (nextPriority === currentPriority && index < current.index)) {
      deduped.set(dedupeKey, { user, index });
    }
  });

  return Array.from(deduped.values())
    .map(({ user }) => ({
      id: user.id || `${normalizeCompany(user.company)}-${user.name}`,
      initials: user.name.split(" ").map(part => part[0]).join("").toUpperCase().slice(0, 2),
      rank: user.rank,
      name: user.name,
      company: normalizeCompany(user.company),
      assignment: getRosterAssignment(user),
      phone: user.phone,
      email: user.email,
      sortAssignment: getRosterAssignmentSort(user),
    }))
    .sort((a, b) => {
      const companyDiff = ROSTER_COMPANY_ORDER.indexOf(a.company) - ROSTER_COMPANY_ORDER.indexOf(b.company);
      if (companyDiff !== 0) return companyDiff;
      const assignmentDiff = a.sortAssignment - b.sortAssignment;
      if (assignmentDiff !== 0) return assignmentDiff;
      return a.name.localeCompare(b.name);
    });
}

function getBattalionStrength(userList) {
  return buildRosterEntries(userList).length;
}

// Comparator for the Recall Roster page sort order:
//   BN (Big Four order) → Alpha → Bravo → Charlie
//   Within company: CC → SEL → 1st PLT (PC first, then alpha) → 2nd PLT → …
function compareRoster(a, b) {
  const ac = normalizeCompany(a.company), bc = normalizeCompany(b.company);
  const co = ROSTER_COMPANY_ORDER.indexOf(ac) - ROSTER_COMPANY_ORDER.indexOf(bc);
  if (co !== 0) return co;

  // BN: use Big Four assignment order, then alpha by last name
  if (ac === "BN") {
    const ai = BN_ROSTER_ASSIGNMENT_ORDER.indexOf(getRosterAssignment(a));
    const bi = BN_ROSTER_ASSIGNMENT_ORDER.indexOf(getRosterAssignment(b));
    const d = (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    if (d !== 0) return d;
    return getNameKey(a.name).localeCompare(getNameKey(b.name));
  }

  // CC first
  if (a.role === "co_cdr" && b.role !== "co_cdr") return -1;
  if (b.role === "co_cdr" && a.role !== "co_cdr") return  1;
  // SEL second
  if (a.role === "sel" && b.role !== "sel") return -1;
  if (b.role === "sel" && a.role !== "sel") return  1;
  // By platoon number (1st → 2nd → 3rd…)
  const pd = getPlatoonSortValue(a.platoon) - getPlatoonSortValue(b.platoon);
  if (pd !== 0) return pd;
  // Within platoon: PC before everyone else
  if (a.role === "plt_cdr" && b.role !== "plt_cdr") return -1;
  if (b.role === "plt_cdr" && a.role !== "plt_cdr") return  1;
  // Alpha by last name
  return getNameKey(a.name).localeCompare(getNameKey(b.name));
}

function getNameKey(name) {
  return (name || "").split(",")[0].trim().toLowerCase();
}

function matchesUserIdentity(user, candidate = {}) {
  if (!user) return false;
  const candidateId = (candidate.id || "").trim();
  const candidateEid = (candidate.eid || "").trim().toLowerCase();
  const candidateEmail = (candidate.email || "").trim().toLowerCase();
  const candidateName = (candidate.name || "").trim().toLowerCase();
  const userEmail = (user.email || "").trim().toLowerCase();
  const userEid = (user.eid || "").trim().toLowerCase();
  const userName = (user.name || "").trim().toLowerCase();
  const userNameKey = getNameKey(user.name);
  const candidateNameKey = getNameKey(candidate.name);

  return (candidateId && user.id === candidateId) ||
    (candidateEid && userEid === candidateEid) ||
    (candidateEmail && userEmail === candidateEmail) ||
    (candidateName && userName === candidateName) ||
    (candidateNameKey && userNameKey === candidateNameKey);
}

function findMatchingUser(userList, candidate) {
  if (!candidate) return null;
  return userList.find(user => matchesUserIdentity(user, candidate)) || null;
}

function canSubmitChit(user) {
  return !!user && !isBigFour(user);
}

function requiresChitRouteSelection(user) {
  if (!user || isBigFour(user) || ["adj", "co_cdr", "plt_cdr"].includes(user.role)) return false;
  return !["Alpha", "Bravo", "Charlie"].includes(normalizeCompany(user.company)) || !/^\d+(?:st|nd|rd|th)\s*PC$/i.test(normalizePlatoon(user.platoon));
}

function getCompanyCommander(userList, company) {
  return userList.find(u => normalizeCompany(u.company) === normalizeCompany(company) && u.role === "co_cdr");
}

function getPlatoonCommander(userList, company, platoon) {
  const normalizedCompany = normalizeCompany(company);
  const normalizedPlatoon = normalizePlatoon(platoon);
  return userList.find(u =>
    normalizeCompany(u.company) === normalizedCompany &&
    u.role === "plt_cdr" &&
    normalizePlatoon(u.platoon) === normalizedPlatoon
  );
}

function formatRouteNode(label, person) {
  if (!label) return "";
  if (!person) return label;
  return `${label} (${person.name.split(",")[0]})`;
}

function resolveChitRoutingContext(user, form) {
  const needsSelection = requiresChitRouteSelection(user);
  const company = normalizeCompany(
    needsSelection
      ? (form.routeCompany || user.company)
      : user.company
  );
  const platoon = normalizePlatoon(
    needsSelection
      ? (form.routePlatoon || user.platoon)
      : user.platoon
  );

  return { company, platoon, needsSelection };
}

function makeChitChainNode(label, stageName, person, approverRole, icon) {
  return {
    label: formatRouteNode(label, person),
    stageName,
    approverId: person?.id || null,
    approverName: person?.name || label,
    approverRole: approverRole || person?.role || null,
    icon,
  };
}

function buildChitApprovalChain(userList, user, routeContext) {
  const { company, platoon } = routeContext;
  const adj = userList.find(u => u.role === "adj");
  const bnxo = userList.find(u => u.role === "xo");
  const bnco = userList.find(u => u.role === "bn_cdr");
  const cc = getCompanyCommander(userList, company);
  const pc = getPlatoonCommander(userList, company, platoon);
  const chain = [];

  if (user.role === "adj") {
    chain.push(
      makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "🎖"),
      makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "✅"),
    );
  } else if (user.role === "co_cdr") {
    chain.push(
      makeChitChainNode("ADJ", "ADJ Review", adj, "adj", "🗂"),
      makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "🎖"),
      makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "✅"),
    );
  } else if (user.role === "plt_cdr") {
    chain.push(
      makeChitChainNode(`${getCompanyShortName(company)} CC`, "CC Review", cc, "co_cdr", "⭐"),
      makeChitChainNode("ADJ", "ADJ Review", adj, "adj", "🗂"),
      makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "🎖"),
      makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "✅"),
    );
  } else {
    chain.push(
      makeChitChainNode(formatPlatoonLabel(platoon), "PC Review", pc, "plt_cdr", "👤"),
      makeChitChainNode(`${getCompanyShortName(company)} CC`, "CC Review", cc, "co_cdr", "⭐"),
      makeChitChainNode("ADJ", "ADJ Review", adj, "adj", "🗂"),
      makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "🎖"),
      makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "✅"),
    );
  }

  return chain.length > 0 && chain.every(node => node.approverId) ? chain : [];
}

function buildChitRoute(userList, user, routeContext) {
  return buildChitApprovalChain(userList, user, routeContext).map(node => node.label);
}

function buildChitStages(submitterName, submittedAt, approvalChain) {
  return [
    { name:"Submitted", routeLabel: submitterName, approverId:null, approverRole:null, approverName:submitterName, icon:"📝", completedBy:submitterName, completedAt:submittedAt, comment:"" },
    ...approvalChain.map(node => ({
      name: node.stageName,
      routeLabel: node.label,
      approverId: node.approverId,
      approverRole: node.approverRole,
      approverName: node.approverName,
      icon: node.icon,
      completedBy:null,
      completedAt:null,
      comment:"",
    })),
    { name:"Complete", routeLabel:"", approverId:null, approverRole:null, approverName:"", icon:"🏅", completedBy:null, completedAt:null, comment:"" },
  ];
}

function canActOnChit(user, chit) {
  if (!user || !chit?.stages || chit.status === "Approved" || chit.status === "Denied" || chit.status === "Returned") return false;
  if (chit.currentStage >= chit.stages.length - 1) return false;
  // Enforce CoC order: every prior stage must be completed before acting on the current one
  if (!chit.stages.slice(0, chit.currentStage).every(s => s.completedBy)) return false;
  const stage = chit.stages[chit.currentStage];
  if (!stage?.approverRole) return false;
  if (stage.approverId && user.id === stage.approverId) return true;
  if (stage.approverRole === "plt_cdr") {
    return user.role === "plt_cdr" &&
      normalizeCompany(user.company) === normalizeCompany(chit.company) &&
      normalizePlatoon(user.platoon) === normalizePlatoon(chit.platoon);
  }
  if (stage.approverRole === "co_cdr") {
    return user.role === "co_cdr" && normalizeCompany(user.company) === normalizeCompany(chit.company);
  }
  return user.role === stage.approverRole;
}

function canViewChit(user, chit) {
  if (!user || !chit) return false;
  if (matchesUserIdentity(user, { id: chit.userId, name: chit.name })) return true;
  return !!chit.stages?.some(stage => {
    if (matchesUserIdentity(user, { id: stage.approverId, name: stage.approverName })) return true;
    if (stage.approverRole === "plt_cdr") {
      return user.role === "plt_cdr" &&
        normalizeCompany(user.company) === normalizeCompany(chit.company) &&
        normalizePlatoon(user.platoon) === normalizePlatoon(chit.platoon);
    }
    if (stage.approverRole === "co_cdr") {
      return user.role === "co_cdr" && normalizeCompany(user.company) === normalizeCompany(chit.company);
    }
    return !!stage.approverRole && user.role === stage.approverRole;
  });
}

// ─── USERS ──────────────────────────────────────────────────
// User data is sourced entirely from Google Sheets via Apps Script.
// No credentials are stored in this file. See SHEETS_API_URL below.

// ─── GOOGLE CALENDAR CONFIG ──────────────────────────────────
// To enable live event fetching, create a free API key at console.cloud.google.com
// (Enable "Google Calendar API", restrict key to Calendar API readonly).
const GCAL_API_KEY      = window.__QD_GCAL_API_KEY || "";
const GCAL_CALENDAR_ID  = "8favdaqbd14bfquur8fvil5ecc@group.calendar.google.com";

// Spring 2026: Week 1 starts Monday Jan 19 2026.  Change each semester.
const SEMESTER_START = new Date("2026-01-19T00:00:00");
const SEMESTER_LABEL = "Spring 2026";

function getCurrentWeekMonday() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun … 6=Sat
  const daysBack = day === 0 ? 6 : day - 1;
  const mon = new Date(now);
  mon.setHours(0, 0, 0, 0);
  mon.setDate(mon.getDate() - daysBack);
  // On Saturday or Sunday flip forward to the upcoming Monday
  if (day === 6 || day === 0) mon.setDate(mon.getDate() + 7);
  return mon;
}
function getWeekNumber(mon) {
  return Math.round((mon - SEMESTER_START) / (7 * 24 * 3600 * 1000)) + 1;
}
function formatWeekRange(mon) {
  const fri = new Date(mon); fri.setDate(fri.getDate() + 4);
  const M = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const f = d => `${String(d.getDate()).padStart(2,"0")}${M[d.getMonth()]}${String(d.getFullYear()).slice(-2)}`;
  return `${f(mon)} - ${f(fri)}`;
}
function formatEventTime(isoStr) {
  if (!isoStr) return "";
  const d = new Date(isoStr);
  return `${String(d.getHours()).padStart(2,"0")}${String(d.getMinutes()).padStart(2,"0")}`;
}
function guessEventType(title) {
  const t = (title || "").toLowerCase();
  if (/\bpt\b|run|fep|drill/.test(t)) return "PT";
  if (/fitrep|chit|inspection/.test(t)) return "Admin";
  if (/leadership|leadlab|\bll\b/.test(t)) return "Leadership";
  if (/tutor|calculus|physics/.test(t)) return "Academic";
  if (/staff|meeting|sync/.test(t)) return "Staff";
  if (/conference/.test(t)) return "Conference";
  return "Event";
}

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function fetchCalendarEvents() {
  if (!GCAL_API_KEY || !GCAL_CALENDAR_ID) return Promise.resolve([]);
  const now = new Date();
  const maxDate = new Date(now);
  maxDate.setDate(maxDate.getDate() + 14);
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GCAL_CALENDAR_ID)}/events`
    + `?key=${GCAL_API_KEY}`
    + `&timeMin=${now.toISOString()}`
    + `&timeMax=${maxDate.toISOString()}`
    + `&singleEvents=true`
    + `&orderBy=startTime`
    + `&maxResults=20`;
  return fetch(url)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => (data.items || [])
      .filter(ev => !/^potw$/i.test((ev.summary || "").trim()))
      .map(ev => {
        const allDay = !!ev.start.date;
        const start = new Date(ev.start.dateTime || ev.start.date);
        const end = ev.end ? new Date(ev.end.dateTime || ev.end.date) : null;
        const dd = String(start.getDate()).padStart(2, "0");
        const mo = MONTHS[start.getMonth()];
        const time = allDay ? "All Day"
          : `${formatEventTime(ev.start.dateTime)}–${end ? formatEventTime(ev.end.dateTime) : ""}`;
        return {
          date: `${dd} ${mo}`,
          title: ev.summary || "(No title)",
          time,
          type: guessEventType(ev.summary),
          location: ev.location || "",
        };
      })
    )
    .catch(() => []);
}

function useCalendarEvents() {
  const [events, setEvents] = useState([]);
  useEffect(() => { fetchCalendarEvents().then(setEvents); }, []);
  return events;
}

// ─── STATIC DATA ────────────────────────────────────────────
const POTW = {
  operations: [
    { date:"06 APR", title:"Battalion PT", time:"0700–0800", type:"PT", location:"" },
    { date:"07 APR", title:"Navy LL: RADM Oliver Lewis", time:"0700–0900", type:"Leadership", location:"" },
    { date:"07 APR", title:"FEX Prep", time:"0700–0800", type:"Admin", location:"" },
    { date:"07 APR", title:"Calculus/Physics Tutoring", time:"1900–2000", type:"Academic", location:"" },
    { date:"08 APR", title:"Navy Company PT", time:"0700–0800", type:"PT", location:"" },
    { date:"09 APR", title:"Spring FEX", time:"All Day", type:"Event", location:"" },
    { date:"09 APR", title:"FEP", time:"0700–0800", type:"PT", location:"" },
    { date:"09 APR", title:"BN Staff Meeting", time:"1530–1630", type:"Staff", location:"" },
    { date:"10 APR", title:"Drill", time:"0700–0800", type:"Drill", location:"" },
    { date:"10 APR", title:"Unit Sync Meeting", time:"1000–1100", type:"Staff", location:"" },
  ],
};


const PT = [
  { day:"Monday", focus:"Cardio / Run", exercises:[
    { name:"Dynamic Warm-up", sets:"10 min", notes:"High knees, butt kicks, leg swings" },
    { name:"4-Mile Timed Run", sets:"BFT Pace", notes:"Two-person accountability" },
    { name:"Cool Down Stretch", sets:"5 min", notes:"" },
  ]},
  { day:"Wednesday", focus:"Strength / ACFT Prep", exercises:[
    { name:"SDC (Sprint-Drag-Carry)", sets:"3x50m", notes:"Full gear" },
    { name:"Deadlift (Hex Bar)", sets:"3x8 @ 60% 1RM", notes:"ACFT standard weight" },
    { name:"Hand Release Push-Ups", sets:"3xMax", notes:"Rest 90s between sets" },
    { name:"Plank Hold", sets:"3x1 min", notes:"" },
  ]},
  { day:"Friday", focus:"Team Fitness", exercises:[
    { name:"Sandbag Circuit", sets:"4 rounds", notes:"Rotate stations every 2 min" },
    { name:"Fireman Carries", sets:"4x25m", notes:"Alternate each rep" },
    { name:"TRX Rows", sets:"3x8", notes:"" },
    { name:"Flutter Kicks", sets:"3x30", notes:"Core finisher" },
  ]},
];

const LEADLAB_INIT = [
  { id:1, title:"Land Navigation",          date:"Mar 12", notes:"Bring protractor, compass, pencil. MGRS map issued at 1345." },
  { id:2, title:"React to Contact",         date:"Mar 26", notes:"ACU/camouflage required. No live ammo." },
  { id:3, title:"Leadership Reaction Course", date:"Apr 9",  notes:"Teams assigned day prior." },
];

// Three fixed PT sessions per week. OPS (and other seniors) upload PDFs here.
const PT_SESSIONS = [
  { key:"monday",    day:"Monday",    type:"BN PT",      desc:"Battalion-wide formation PT",    color:"#BF5700" },
  { key:"wednesday", day:"Wednesday", type:"Company PT", desc:"Company-level physical training", color:"#003087" },
  { key:"thursday",  day:"Thursday",  type:"FEP",        desc:"Fitness Enhancement Program",    color:"#2A7D4F" },
];

const INIT_CHITS = [];

const INIT_QS = [
  { id:1, authorId:"u009", author:"Wilson, Ryan",   rank:"CDT/PVT", subject:"Calculus II", time:"2h ago", answered:true,
    text:"Struggling with integration by parts — when to use it vs u-substitution. Any tips for the LIATE rule?",
    answers:[{ author:"Davis, Kyle", rank:"CDT/2LT", text:"LIATE = Logarithm, Inverse trig, Algebraic, Trig, Exponential. Pick your u from whichever type comes first in that list. Use IBP when you have a product of two different function types." }] },
  { id:2, authorId:"u012", author:"Nguyen, Lily",   rank:"CDT/PFC", subject:"Physics I",   time:"5h ago", answered:true,
    text:"Do we account for air resistance in PHY 301 projectile motion problems?",
    answers:[{ author:"Peterson, Chris", rank:"CDT/MAJ", text:"Ignore air resistance unless explicitly stated. For max range on flat ground, 45 degrees is always your answer." }] },
  { id:3, authorId:"u011", author:"Jackson, Tyler", rank:"CDT/SPC", subject:"Calculus III",time:"1d ago", answered:false,
    text:"What is the best way to set up triple integrals? I keep confusing the order of integration.",
    answers:[] },
];


// ─── GOOGLE SHEETS CONFIG (Option B — Private Sheet via Apps Script) ──
// HOW TO CONNECT YOUR PRIVATE ROSTER GOOGLE SHEET:
//   1. Open your Google Sheet → Extensions → Apps Script
//   2. Paste the code from google_apps_script.js into Code.gs
//   3. Set SECRET_TOKEN and SHEET_NAME in the script
//   4. Deploy → New Deployment → Web App (Execute as: Me, Access: Anyone)
//   5. Copy the deployment URL and paste below
//   6. Set the same token below
//   7. Save — the app will pull live data on each page load.
//      In sheet-only mode, the app stays locked until this feed loads successfully.
const SHEETS_API_URL   = "https://script.google.com/macros/s/AKfycbzCHnTg4UmmYFaTlJf8_MP8TZU9fe1RsGmaRQ-X-2EwxdVluowDjkPjMPnG82tjlYun/exec";
const SHEETS_API_TOKEN = "UT_NROTC";
const ROSTER_CACHE_KEY = "quarterdeck_roster_cache_v1";

function loadCachedRoster() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return [];
    const raw = window.localStorage.getItem(ROSTER_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.every(user =>
      user &&
      typeof user === "object" &&
      Object.prototype.hasOwnProperty.call(user, "password")
    ) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveCachedRoster(users) {
  try {
    if (typeof window === "undefined" || !window.localStorage || !Array.isArray(users)) return;
    window.localStorage.setItem(ROSTER_CACHE_KEY, JSON.stringify(users));
  } catch (err) {
    // Ignore cache write failures; live data still works.
  }
}
const SHEET_ONLY_MODE  = true;

// Sheet row 1 must be a header row with these exact names (any column order):
//   company | name | class | email | phone_number | major | campus | eid | password | billet
// Maps sheet company prefix → app company name
const COMPANY_MAP = {
  "BN Staff": "BN",
  "A":        "Alpha",
  "B":        "Bravo",
  "C":        "Charlie",
};

// Maps sheet billet → app role
const BILLET_TO_ROLE = {
  "BNCO":   "bn_cdr",
  "BNXO":   "xo",
  "OPS":    "ops",
  "SEL":    "sel",
  "ADJ":    "adj",
  "PTO":    "pto",
  "TRAINO": "traino",
  "AO":     "academics",
  "A CC":   "co_cdr",
  "B CC":   "co_cdr",
  "C CC":   "co_cdr",
  "A SEL":  "sel",
  "B SEL":  "sel",
  "C SEL":  "sel",
  "1st PC":   "plt_cdr",
  "2nd PC":   "plt_cdr",
  "3rd PC":   "plt_cdr",
  "CC":       "co_cdr",
  "SEL":      "sel",
  "AOPS":   "mid",
  "PAO":    "mid",
  "SUPPO":  "mid",
  "BGDO":   "mid",
  "COC":    "mid",
  "CGC":    "mid",
  "MIR":    "mid",
};

// Converts a sheet row object → app user object
function sheetRowToUser(row, index) {
  const companyRaw = (row.company || "").trim();
  const billetRaw  = (row.billet || "").trim();
  const nameRaw    = (row.name || "").trim();
  const classVal   = (row.class || "").trim();

  // Company: "BN Staff" → "BN", "A 1st" → "Alpha", "B" → "Bravo", etc.
  // If company column doesn't start with A/B/C (e.g. "2nd PC"), fall back to billet prefix
  let companyKey;
  if (companyRaw === "BN Staff") companyKey = "BN Staff";
  else if (/^[ABC]\b/.test(companyRaw)) companyKey = companyRaw.charAt(0);
  else if (/^[ABC]\s/.test(billetRaw)) companyKey = billetRaw.charAt(0);
  else companyKey = companyRaw;
  const company = normalizeCompany(COMPANY_MAP[companyKey] || companyRaw);

  // Platoon: extract from company or billet if it has a number (e.g. "A 1st" → "1st PC")
  const platoonMatch = companyRaw.match(/(\d+(?:st|nd|rd|th))/i) || billetRaw.match(/(\d+(?:st|nd|rd|th))/i);
  const platoon = platoonMatch
    ? `${platoonMatch[1]} PLT`
    : /CC$/i.test(billetRaw)
      ? "CO"
      : /SEL$/i.test(billetRaw)
        ? "SEL"
        : billetRaw;

  // Name: strip rank prefix (MIDN, GySgt, SSgt, OC, Sgt, etc.)
  const name = nameRaw.replace(/^(MIDN|GySgt|GySGT|SSgt|SSGT|OC|Sgt|SGT|Cpl|CPL|LCpl|PFC)\s+/i, "").trim();

  // Rank: "1/C"→"MIDN 1/C", "GySgt"→"GySgt", etc.
  const rank = /^\d\/C$/i.test(classVal) ? `MIDN ${classVal}` : classVal;

  // Role from billet — strip company letter prefix for matching (e.g. "A 1st PC" → "1st PC")
  const billetNorm = billetRaw.replace(/^[ABC]\s+/, "");
  const role = BILLET_TO_ROLE[billetRaw] || BILLET_TO_ROLE[billetNorm] || "mid";

  return {
    id:       (row.eid || `sheet-${index}`).trim(),
    name,
    rank,
    role,
    company,
    platoon,
    password: (row.password || "").trim(),
    email:    (row.email || "").trim(),
    phone:    (row.phone_number || row.phone || "").trim(),
    major:    (row.major || "").trim(),
    campus:   (row.campus || "").trim(),
    eid:      (row.eid || "").trim(),
    billet:   billetRaw,
    mustChangePassword: false,
  };
}

// ─── FITREP DATA ─────────────────────────────────────────────
// Pipeline: Submitted → PC Review → Co CDR Review → ADJ Review → BNXO Review → BNCO Approval → Complete
// Used only as a reference template for stage icons; each fitrep stores its own stages array.
const FITREP_STAGES = [
  { name:"Submitted",      approverRole:null,      icon:"📝" },
  { name:"PC Review",      approverRole:"plt_cdr", icon:"👤" },
  { name:"Co CDR Review",  approverRole:"co_cdr",  icon:"⭐" },
  { name:"ADJ Review",     approverRole:"adj",     icon:"🗂" },
  { name:"BNXO Review",    approverRole:"xo",      icon:"🎖" },
  { name:"BNCO Approval",  approverRole:"bn_cdr",  icon:"✅" },
  { name:"Complete",       approverRole:null,      icon:"🏅" },
];

// Returns true if `user` is the designated approver for the fitrep's current stage.
// Uses per-fitrep stages array (same pattern as canActOnChit).
function canActOnFitrep(user, fitrep) {
  if (!user || !fitrep?.stages || fitrep.status === "Returned" || fitrep.currentStage >= fitrep.stages.length - 1) return false;
  // Enforce CoC order: every prior stage must be completed before acting on the current one
  if (!fitrep.stages.slice(0, fitrep.currentStage).every(s => s.completedBy)) return false;
  const stage = fitrep.stages[fitrep.currentStage];
  if (!stage?.approverRole) return false;
  if (stage.approverId && user.id === stage.approverId) return true;
  if (stage.approverRole === "plt_cdr")
    return user.role === "plt_cdr" &&
      normalizeCompany(user.company) === normalizeCompany(fitrep.company) &&
      normalizePlatoon(user.platoon) === normalizePlatoon(fitrep.platoon);
  if (stage.approverRole === "co_cdr")
    return user.role === "co_cdr" && normalizeCompany(user.company) === normalizeCompany(fitrep.company);
  return user.role === stage.approverRole;
}

// Only those in the routing chain (or the subject) can view a fitrep.
// OPS and BN SEL are NOT in the pipeline and therefore cannot see fitreps.
function canViewFitrep(user, fitrep) {
  if (!user || !fitrep) return false;
  // Subject always sees their own
  if (matchesUserIdentity(user, { id: fitrep.subjectId, name: fitrep.subjectName })) return true;
  // Check if user is listed in any routing stage
  return !!fitrep.stages?.some(stage => {
    if (!stage.approverRole) return false;
    if (stage.approverId && matchesUserIdentity(user, { id: stage.approverId })) return true;
    if (stage.approverRole === "plt_cdr") {
      return user.role === "plt_cdr" &&
        normalizeCompany(user.company) === normalizeCompany(fitrep.company) &&
        normalizePlatoon(user.platoon) === normalizePlatoon(fitrep.platoon);
    }
    if (stage.approverRole === "co_cdr") {
      return user.role === "co_cdr" && normalizeCompany(user.company) === normalizeCompany(fitrep.company);
    }
    return user.role === stage.approverRole;
  });
}

const INIT_FITREBS = [];

// ─── STYLES ─────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&family=Oswald:wght@700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Barlow', "Segoe UI", sans-serif; font-size: 1rem; background: #FFF8F0; color: #1A1209; }

  .topbar { background: #1A1209; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 1.25rem; height: 58px; border-bottom: 3px solid #BF5700; position: sticky; top: 0; z-index: 50; }
  .topbar-logo { width: 40px; height: 40px; background: #BF5700; border-radius: 6px; display: grid; place-items: center; font-family: 'Rajdhani', Impact, sans-serif; font-weight: 700; font-size: 1.1rem; color: white; margin-right: 0.7rem; }
  .topbar-title { font-family: 'Rajdhani', Impact, sans-serif; font-weight: 500; font-size: 1.35rem; letter-spacing: 3px; text-transform: uppercase; }
  .topbar-title span { color: #F7941D; }
  .topbar-right { display: flex; align-items: center; gap: 0.75rem; }
  .rank-pill { background: #BF5700; color: white; padding: 2px 8px; border-radius: 4px; font-family: 'Rajdhani', Impact, sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
  .role-pill { background: rgba(255,255,255,0.12); color: #ccc; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; text-transform: uppercase; }
  .btn-logout { background: transparent; border: 1.5px solid rgba(255,255,255,0.25); color: #ccc; border-radius: 4px; padding: 3px 10px; font-size: 0.75rem; cursor: pointer; font-family: 'Rajdhani', Impact, sans-serif; letter-spacing: 1px; text-transform: uppercase; }
  .btn-logout:hover { background: rgba(255,255,255,0.1); }

  .layout { display: flex; min-height: calc(100vh - 58px); }
  .sidebar { width: 210px; background: #0D1B2A; flex-shrink: 0; position: sticky; top: 58px; height: calc(100vh - 58px); overflow-y: auto; display: flex; flex-direction: column; }
  .sidebar-group { padding: 1rem 0 0.5rem; }
  .sidebar-label { font-family: 'Rajdhani', Impact, sans-serif; font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase; color: #7a8fa0; padding: 0 1rem; margin-bottom: 0.5rem; }
  .nav-btn { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; cursor: pointer; color: #9ab0c4; font-size: 0.88rem; border-left: 3px solid transparent; transition: all 0.15s; background: none; border-top: none; border-right: none; border-bottom: none; width: 100%; text-align: left; }
  .nav-btn:hover { background: rgba(255,255,255,0.05); color: white; }
  .nav-btn.active { background: rgba(191,87,0,0.2); color: #F7941D; border-left-color: #BF5700; font-weight: 600; }
  .nav-btn.active .nav-structure-icon { color: #9ab0c4; font-weight: 400; }
  .sidebar-footer { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.08); margin-top: auto; font-size: 0.75rem; color: #6b7e90; line-height: 1.6; }

  .content { flex: 1; padding: 1.5rem; overflow-y: auto; min-width: 0; }

  .page-title { font-family: 'Rajdhani', Impact, sans-serif; font-size: 2.1rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 0.2rem; }
  .page-title span { color: #BF5700; }
  .page-sub { font-size: 0.88rem; color: #6B6B6B; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 2px solid rgba(191,87,0,0.15); }

  .card { background: white; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid rgba(191,87,0,0.1); margin-bottom: 1rem; }
  .card-title { font-family: 'Rajdhani', Impact, sans-serif; font-size: 0.9rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #1A1209; }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }

  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }

  .stat { background: white; border-radius: 10px; padding: 1rem 1.2rem; border-left: 4px solid #BF5700; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
  .stat-n { font-family: 'Rajdhani', Impact, sans-serif; font-size: 2.4rem; font-weight: 700; color: #BF5700; line-height: 1; }
  .stat-l { font-size: 0.78rem; color: #6B6B6B; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.2rem; }

  .btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; border-radius: 6px; font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.8rem; letter-spacing: 0.5px; text-transform: uppercase; cursor: pointer; border: none; font-weight: 600; transition: all 0.15s; }
  .btn-orange { background: #BF5700; color: white; }
  .btn-orange:hover { background: #8B3D00; }
  .btn-outline { background: transparent; border: 2px solid #BF5700; color: #BF5700; }
  .btn-outline:hover { background: #BF5700; color: white; }
  .btn-navy { background: #0D1B2A; color: white; }
  .btn-sm { padding: 0.25rem 0.65rem; font-size: 0.72rem; }
  .btn-green { background: #2A7D4F; color: white; }
  .btn-red { background: #C0392B; color: white; }

  .badge { display: inline-block; padding: 2px 7px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .badge-orange { background: rgba(191,87,0,0.12); color: #8B3D00; }
  .badge-green  { background: rgba(42,125,79,0.15); color: #2A7D4F; }
  .badge-red    { background: rgba(192,57,43,0.15); color: #C0392B; }
  .badge-navy   { background: rgba(13,27,42,0.1); color: #0D1B2A; }
  .badge-gray   { background: #eee; color: #666; }

  .input { width: 100%; padding: 0.5rem 0.75rem; border: 1.5px solid #ddd; border-radius: 6px; font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.9rem; color: #1A1209; background: white; }
  .input:focus { outline: none; border-color: #BF5700; }
  .input-group { margin-bottom: 0.9rem; }
  .input-label { display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #6B6B6B; margin-bottom: 0.3rem; }

  .alert { background: rgba(191,87,0,0.08); border: 1.5px solid #BF5700; border-radius: 8px; padding: 0.65rem 1rem; font-size: 0.85rem; color: #8B3D00; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
  .alert-green { background: rgba(42,125,79,0.1); border-color: #2A7D4F; color: #2A7D4F; }
  .privacy-note { background: rgba(13,27,42,0.05); border: 1.5px solid rgba(13,27,42,0.15); border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.82rem; color: #0D1B2A; margin-bottom: 1rem; }

  .potw-card { background: linear-gradient(135deg, #1A1209 0%, #0D1B2A 100%); color: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; }
  .potw-week { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.68rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #F7941D; margin-bottom: 0.4rem; }
  .potw-title { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.6rem; }
  .potw-body { font-size: 0.88rem; line-height: 1.6; color: #CCC; margin-bottom: 0.75rem; }

  .event-row { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.7rem 0; border-bottom: 1px solid #f0ede8; }
  .event-date { min-width: 46px; text-align: center; background: #BF5700; color: white; border-radius: 7px; padding: 3px; }
  .event-day { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 1.35rem; font-weight: 700; line-height: 1; }
  .event-mo  { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 1px; }
  .event-title { font-weight: 600; font-size: 0.88rem; }
  .event-sub   { font-size: 0.78rem; color: #6B6B6B; }

  .company-block { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 1rem; }
  .company-header { color: white; padding: 0.8rem 1.2rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
  .company-name { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 1.05rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
  .company-co { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.78rem; font-style: normal; color: rgba(255,255,255,0.75); }
  .platoon-grid { padding: 1rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 0.75rem; }
  .platoon-card { border: 1.5px solid rgba(191,87,0,0.2); border-radius: 8px; padding: 0.75rem; }
  .platoon-name { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.82rem; font-weight: 700; font-style: normal; letter-spacing: 1.5px; color: #BF5700; margin-bottom: 0.35rem; }
  .platoon-detail { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.78rem; font-style: normal; color: #6B6B6B; }

  .pt-block { background: white; border-radius: 8px; overflow: hidden; margin-bottom: 0.75rem; border: 1px solid #eee; }
  .pt-header { background: #BF5700; color: white; padding: 0.55rem 1rem; display: flex; align-items: center; justify-content: space-between; font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.9rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; }
  .pt-row { display: flex; align-items: center; gap: 1rem; padding: 0.4rem 1rem; border-bottom: 1px solid #faf7f4; font-size: 0.85rem; }
  .pt-name { flex: 1; font-weight: 500; }
  .pt-sets { color: #BF5700; font-weight: 600; font-size: 0.82rem; min-width: 80px; }
  .pt-notes { color: #888; font-size: 0.78rem; }

  .chit-card { border-left: 4px solid #BF5700; padding: 1rem; background: white; border-radius: 8px; margin-bottom: 0.75rem; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
  .chit-route { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem; font-size: 0.78rem; }
  .chit-node { background: rgba(191,87,0,0.1); border-radius: 4px; padding: 2px 7px; color: #8B3D00; }

  .form-row { background: white; border-radius: 10px; padding: 1rem 1.2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; border: 1.5px solid #eee; flex-wrap: wrap; }
  .progress-bar { background: #eee; border-radius: 4px; height: 4px; margin-top: 4px; width: 60px; }
  .progress-fill { background: #BF5700; height: 100%; border-radius: 4px; }

  .roster-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 0; border-bottom: 1px solid #f4f0eb; flex-wrap: wrap; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: #BF5700; color: white; display: flex; align-items: center; justify-content: center; font-family: 'Barlow', 'Segoe UI', sans-serif; font-weight: 700; font-style: normal; font-size: 0.82rem; flex-shrink: 0; }

  .q-card { background: white; border-radius: 10px; padding: 1.2rem; margin-bottom: 1rem; border: 1.5px solid #eee; }
  .q-meta { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
  .q-text { font-size: 0.92rem; line-height: 1.55; margin-bottom: 0.75rem; }
  .answer-block { background: rgba(191,87,0,0.04); border-left: 3px solid #BF5700; padding: 0.55rem 0.75rem; border-radius: 0 6px 6px 0; margin-bottom: 0.5rem; font-size: 0.85rem; }
  .answer-author { font-weight: 600; color: #8B3D00; font-size: 0.78rem; margin-bottom: 0.15rem; }

  .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .modal { background: white; border-radius: 12px; padding: 1.5rem; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .modal-title { font-family: 'Rajdhani'; font-size: 1.1rem; letter-spacing: 2px; text-transform: uppercase; }
  .modal-close { background: none; border: none; font-size: 1.4rem; color: #888; cursor: pointer; }

  .tag { display: inline-block; padding: 2px 8px; background: rgba(191,87,0,0.1); border-radius: 20px; font-size: 0.72rem; color: #8B3D00; }

  .login-wrap { min-height: 100vh; background: #1A1209; display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .login-card { background: white; border-radius: 14px; padding: 2.75rem 2.5rem; max-width: 480px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .login-logo { display: flex; align-items: center; gap: 0.75rem; justify-content: center; margin-bottom: 1.25rem; }
  .login-mark { width: 56px; height: 56px; background: #BF5700; border-radius: 10px; display: grid; place-items: center; font-family: 'Oswald', Impact, sans-serif; font-weight: 700; font-size: 1.5rem; color: white; }
  .login-title { font-family: 'Oswald', Impact, sans-serif; font-size: 1.75rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; }
  .login-title span { color: #BF5700; }
  .login-sub { text-align: center; font-size: 0.88rem; color: #888; margin-bottom: 1.5rem; }
  .hint-box { margin-top: 1rem; background: #f5f2ee; border-radius: 8px; padding: 0.75rem; font-size: 0.75rem; color: #666; line-height: 1.6; }

  .mobile-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #1A1209; border-top: 2px solid #BF5700; z-index: 100; }
  .mobile-nav-inner { display: flex; justify-content: space-around; padding: 0.35rem 0; }
  .mobile-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 0.3rem 0.5rem; cursor: pointer; color: #666; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.5px; background: none; border: none; }
  .mobile-btn.active { color: #F7941D; }
  .mobile-icon { font-size: 1.2rem; }

  .empty { text-align: center; padding: 2rem; color: #888; }
  .divider { border: none; border-top: 1px solid #f0ede8; margin: 0.75rem 0; }

  /* ── FITREP STAGE TRACKER ─────────────────────── */
  .stage-track { display: flex; align-items: flex-start; gap: 0; margin: 1rem 0; overflow-x: auto; padding-bottom: 0.25rem; }
  .stage-item { display: flex; flex-direction: column; align-items: center; position: relative; flex: 1; min-width: 90px; }
  .stage-item:not(:last-child)::after { content:""; position:absolute; top:18px; left:50%; width:100%; height:3px; background:#eee; z-index:0; }
  .stage-item.done::after { background:#2A7D4F; }
  .stage-item.active::after { background:linear-gradient(90deg,#2A7D4F 0%,#eee 100%); }
  .stage-dot { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1rem; border:3px solid #eee; background:white; z-index:1; position:relative; flex-shrink:0; }
  .stage-dot.done  { border-color:#2A7D4F; background:#2A7D4F; color:white; }
  .stage-dot.active { border-color:#BF5700; background:#BF5700; color:white; box-shadow:0 0 0 4px rgba(191,87,0,0.2); animation: pulse 2s infinite; }
  .stage-dot.pending  { border-color:#ddd; background:#f5f5f5; color:#aaa; }
  .stage-dot.returned { border-color:#9b1c1c; background:#9b1c1c; color:white; }
  .stage-item.returned::after { background:#9b1c1c; }
  @keyframes pulse { 0%,100% { box-shadow:0 0 0 4px rgba(191,87,0,0.2); } 50% { box-shadow:0 0 0 8px rgba(191,87,0,0.08); } }
  .stage-label { font-size:0.65rem; text-align:center; margin-top:0.35rem; text-transform:uppercase; letter-spacing:0.5px; line-height:1.3; color:#888; font-family:'Barlow','Segoe UI',sans-serif; }
  .stage-label.active   { color:#BF5700; font-weight:700; }
  .stage-label.done     { color:#2A7D4F; }
  .stage-label.returned { color:#9b1c1c; font-weight:700; }
  .stage-approver { font-size:0.6rem; color:#aaa; text-align:center; }
  .stage-approver.active { color:#BF5700; }

  .fitrep-card { background:white; border-radius:10px; border:1.5px solid #eee; margin-bottom:1rem; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
  .fitrep-header { padding:0.9rem 1.2rem; border-bottom:1px solid #f5f2ee; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; }
  .fitrep-body { padding:1rem 1.2rem; }
  .stage-comment { background:#f8f6f2; border-left:3px solid #2A7D4F; border-radius:0 6px 6px 0; padding:0.5rem 0.75rem; margin-top:0.4rem; font-size:0.82rem; }
  .stage-comment-by { font-size:0.72rem; color:#2A7D4F; font-weight:600; margin-bottom:0.2rem; font-family:'Barlow','Segoe UI',sans-serif; letter-spacing:0.5px; text-transform:uppercase; }
  .active-stage-comment { background:#fff9f5; border-left:3px solid #BF5700; border-radius:0 6px 6px 0; padding:0.5rem 0.75rem; margin-top:0.4rem; font-size:0.82rem; }
  .stage-action-box { background:#fff9f5; border:1.5px solid rgba(191,87,0,0.2); border-radius:8px; padding:0.9rem; margin-top:0.75rem; }
  .stage-action-label { font-family:'Barlow','Segoe UI',sans-serif; font-size:0.72rem; letter-spacing:1.5px; text-transform:uppercase; color:#BF5700; margin-bottom:0.5rem; }

  /* ── ACCOUNT MODAL ───────────────────────────────── */
  .acct-field { display:flex; align-items:center; gap:0.75rem; padding:0.55rem 0; border-bottom:1px solid #f5f2ee; font-size:0.88rem; }
  .acct-label { font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#888; min-width:90px; }
  .first-login-banner { background:rgba(191,87,0,0.1); border:1.5px solid #BF5700; border-radius:8px; padding:0.75rem 1rem; margin-bottom:1.25rem; font-size:0.85rem; color:#8B3D00; }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .mobile-nav { display: block; }
    .content { padding: 1rem; padding-bottom: 5rem; }
    .grid2 { grid-template-columns: 1fr; }
    .grid3 { grid-template-columns: 1fr; }
  }
`;

// ─── UTILITIES ──────────────────────────────────────────────
function generatePassword() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// ─── SMALL SHARED COMPONENTS ────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Account info + password change modal
function AccountModal({ onClose, onPasswordChange }) {
  const { user } = useAuth();
  const [mode, setMode] = useState(user.mustChangePassword ? "change" : "view");
  const [newPass, setNewPass]   = useState("");
  const [confirm, setConfirm]   = useState("");
  const [err, setErr]           = useState("");
  const [success, setSuccess]   = useState("");

  const handleChange = () => {
    if (newPass.length < 8) { setErr("Password must be at least 8 characters."); return; }
    if (newPass !== confirm)  { setErr("Passwords do not match."); return; }
    setErr("");
    onPasswordChange(newPass);
    setSuccess("Password updated successfully.");
    setMode("view");
    setNewPass(""); setConfirm("");
  };

  return (
    <Modal title="Account Information" onClose={onClose}>
      {user.mustChangePassword && mode !== "change" && (
        <div className="first-login-banner">
          ⚠ <strong>Action required:</strong> Please set a new password before continuing.
          <button className="btn btn-orange btn-sm" style={{ marginLeft:"0.75rem" }} onClick={() => setMode("change")}>Set Password</button>
        </div>
      )}
      {success && <div className="alert alert-green">{success}</div>}

      {mode === "view" && (
        <>
          <div className="acct-field"><span className="acct-label">Name</span><strong>{user.name}</strong></div>
          <div className="acct-field"><span className="acct-label">Rank</span>{user.rank}</div>
          <div className="acct-field"><span className="acct-label">Role</span><span className="badge badge-orange">{user.role.replace("_"," ").toUpperCase()}</span></div>
          <div className="acct-field"><span className="acct-label">Company</span>{user.company}</div>
          <div className="acct-field"><span className="acct-label">Platoon</span>{user.platoon}</div>
          <div className="acct-field"><span className="acct-label">Email</span><a href={"mailto:"+user.email} style={{ color:"#BF5700" }}>{user.email}</a></div>
          <div className="acct-field"><span className="acct-label">Phone</span>{user.phone || "—"}</div>
          <div style={{ marginTop:"1.25rem", display:"flex", gap:"0.75rem", justifyContent:"flex-end" }}>
            <button className="btn btn-outline" onClick={() => setMode("change")}>Change Password</button>
            <button className="btn btn-orange" onClick={onClose}>Close</button>
          </div>
        </>
      )}

      {mode === "change" && (
        <>
          {err && <div style={{ background:"rgba(192,57,43,0.1)", border:"1.5px solid #C0392B", borderRadius:"6px", padding:"0.55rem 0.9rem", fontSize:"0.84rem", color:"#C0392B", marginBottom:"0.9rem" }}>⚠ {err}</div>}
          <div className="input-group">
            <label className="input-label">New Password</label>
            <input className="input" type="password" placeholder="At least 8 characters" value={newPass} onChange={e => setNewPass(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Confirm New Password</label>
            <input className="input" type="password" placeholder="Re-enter password" value={confirm} onChange={e => setConfirm(e.target.value)} onKeyDown={e => e.key === "Enter" && handleChange()} />
          </div>
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"flex-end", marginTop:"0.5rem" }}>
            {!user.mustChangePassword && <button className="btn btn-outline" onClick={() => { setMode("view"); setErr(""); }}>Cancel</button>}
            <button className="btn btn-orange" onClick={handleChange}>Update Password</button>
          </div>
        </>
      )}
    </Modal>
  );
}

// First-login forced password change overlay (blocks navigation until resolved)
function FirstLoginGate({ onPasswordChange }) {
  const [newPass, setNewPass]   = useState("");
  const [confirm, setConfirm]   = useState("");
  const [err, setErr]           = useState("");

  const handle = () => {
    if (newPass.length < 8) { setErr("Password must be at least 8 characters."); return; }
    if (newPass !== confirm)  { setErr("Passwords do not match."); return; }
    onPasswordChange(newPass);
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">🔐 Set Your Password</span>
        </div>
        <div className="first-login-banner">
          Your account was issued a temporary password. You must set a permanent password to continue.
        </div>
        {err && <div style={{ background:"rgba(192,57,43,0.1)", border:"1.5px solid #C0392B", borderRadius:"6px", padding:"0.55rem 0.9rem", fontSize:"0.84rem", color:"#C0392B", marginBottom:"0.9rem" }}>⚠ {err}</div>}
        <div className="input-group">
          <label className="input-label">New Password</label>
          <input className="input" type="password" placeholder="At least 8 characters" value={newPass} onChange={e => setNewPass(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Confirm Password</label>
          <input className="input" type="password" placeholder="Re-enter password" value={confirm} onChange={e => setConfirm(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
        </div>
        <button className="btn btn-orange" style={{ width:"100%", justifyContent:"center" }} onClick={handle}>Set Password & Continue →</button>
      </div>
    </div>
  );
}

// ─── PAGES ──────────────────────────────────────────────────

function LoginPage({ onLogin, userList, sheetSynced, sheetError, onRetry }) {
  const [name, setName]         = useState("");
  const [pass, setPass]         = useState("");
  const [err, setErr]           = useState("");

  // MFA state
  const [mfaStep, setMfaStep]   = useState(false);   // true = showing code input
  const [mfaUser, setMfaUser]   = useState(null);    // user object pending MFA
  const [mfaCode, setMfaCode]   = useState("");
  const [mfaLoading, setMfaLoading] = useState(false);
  const [mfaInfo, setMfaInfo]   = useState("");       // non-error info message

  const hasRoster = userList.length > 0;
  const locked = !sheetSynced; // block input until live sheet data arrives

  // ── Step 1: validate credentials → send MFA code ──────────────────────────
  const go = () => {
    if (locked) return;
    const q = name.trim().toLowerCase();
    const user = userList.find(u =>
      u.name.toLowerCase() === q ||
      u.name.split(",")[0].trim().toLowerCase() === q ||
      u.email.toLowerCase() === q ||
      (u.eid && u.eid.toLowerCase() === q)
    );
    if (!user) { setErr("Name not found. Try your last name, email, or EID."); return; }
    if (user.password !== pass.trim()) { setErr("Incorrect password. Contact ADJ if you need a reset."); return; }
    if (!user.email) { setErr("No email on file. Contact ADJ to add your email before logging in."); return; }

    setErr("");
    setMfaLoading(true);
    fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "sendMFA", email: user.email }),
    })
      .then(r => r.json())
      .then(data => {
        setMfaLoading(false);
        if (data.ok) {
          setMfaUser(user);
          setMfaStep(true);
          setMfaInfo("A 6-digit code was sent to " + user.email + ". It expires in 5 minutes.");
        } else {
          setErr(data.error || "Failed to send verification code. Try again.");
        }
      })
      .catch(() => {
        setMfaLoading(false);
        setErr("Network error sending verification code. Check your connection.");
      });
  };

  // ── Step 2: verify MFA code → complete login ──────────────────────────────
  const verifyCode = () => {
    if (!mfaCode.trim()) { setErr("Enter the 6-digit code from your email."); return; }
    setErr("");
    setMfaLoading(true);
    fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "verifyMFA", email: mfaUser.email, code: mfaCode.trim() }),
    })
      .then(r => r.json())
      .then(data => {
        setMfaLoading(false);
        if (data.ok) {
          onLogin(mfaUser);
        } else {
          setErr(data.error || "Verification failed. Try again or request a new code.");
        }
      })
      .catch(() => {
        setMfaLoading(false);
        setErr("Network error verifying code. Check your connection.");
      });
  };

  // ── Resend code ───────────────────────────────────────────────────────────
  const resendCode = () => {
    setErr("");
    setMfaCode("");
    setMfaLoading(true);
    fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "sendMFA", email: mfaUser.email }),
    })
      .then(r => r.json())
      .then(data => {
        setMfaLoading(false);
        if (data.ok) {
          setMfaInfo("A new code was sent to " + mfaUser.email + ".");
        } else {
          setErr(data.error || "Failed to resend code.");
        }
      })
      .catch(() => {
        setMfaLoading(false);
        setErr("Network error. Check your connection.");
      });
  };

  // ── Shared card chrome ────────────────────────────────────────────────────
  const banner = (msg, color) => (
    <div style={{ background:`rgba(${color},0.1)`, border:`1.5px solid rgb(${color})`, borderRadius:"6px", padding:"0.55rem 0.9rem", fontSize:"0.84rem", color:`rgb(${color})`, marginBottom:"0.9rem" }}>
      {msg}
    </div>
  );

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-mark">UT</div>
          <div className="login-title">The <span>Quarterdeck</span></div>
        </div>

        {!mfaStep ? (
          <>
            <div className="login-sub">Sign in with your battalion credentials</div>

            {!sheetSynced && !hasRoster && (
              <div style={{ background:"rgba(191,87,0,0.08)", border:"1.5px solid #BF5700", borderRadius:"6px", padding:"0.65rem 1rem", fontSize:"0.84rem", color:"#BF5700", marginBottom:"0.9rem", display:"flex", alignItems:"center", gap:"0.6rem" }}>
                <span style={{ fontSize:"1.1rem" }}>⏳</span>
                <span>Syncing roster from Google Sheets… please wait.</span>
              </div>
            )}
            {!sheetSynced && hasRoster && (
              <div style={{ background:"rgba(191,87,0,0.08)", border:"1.5px solid #BF5700", borderRadius:"6px", padding:"0.65rem 1rem", fontSize:"0.84rem", color:"#BF5700", marginBottom:"0.9rem" }}>
                ⏳ Pulling login details…
              </div>
            )}
            {sheetSynced && sheetError && (
              <div style={{ background:"rgba(192,57,43,0.1)", border:"1.5px solid #C0392B", borderRadius:"6px", padding:"0.65rem 1rem", fontSize:"0.84rem", color:"#C0392B", marginBottom:"0.9rem" }}>
                ⚠ Could not reach Google Sheets{hasRoster ? ". Using cached roster for now" : ""}. Check your connection and{" "}
                <button onClick={onRetry} style={{ background:"none", border:"none", color:"#C0392B", fontWeight:700, textDecoration:"underline", cursor:"pointer", fontSize:"inherit", padding:0 }}>retry</button>.
              </div>
            )}

            {err && banner("⚠ " + err, "192,57,43")}

            <div className="input-group">
              <label className="input-label" htmlFor="login-username">Last Name, Email, or EID</label>
              <input
                id="login-username"
                name="username"
                className="input"
                autoComplete="username"
                placeholder={locked ? "Waiting for roster sync…" : "Last name, email, or EID"}
                value={name}
                disabled={locked || mfaLoading}
                style={(locked || mfaLoading) ? { opacity:0.45, cursor:"not-allowed" } : {}}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && go()}
              />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                className="input"
                type="password"
                autoComplete="current-password"
                placeholder={locked ? "Waiting for roster sync…" : "Your password"}
                value={pass}
                disabled={locked || mfaLoading}
                style={(locked || mfaLoading) ? { opacity:0.45, cursor:"not-allowed" } : {}}
                onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && go()}
              />
            </div>
            <button
              className="btn btn-orange"
              style={{ width:"100%", justifyContent:"center", marginTop:"0.25rem", opacity:(locked || mfaLoading) ? 0.45 : 1, cursor:(locked || mfaLoading) ? "not-allowed" : "pointer", fontFamily:"'Barlow', 'Segoe UI', sans-serif", letterSpacing:"normal", textTransform:"none" }}
              disabled={locked || mfaLoading}
              onClick={go}
            >
              {mfaLoading ? "⏳ Sending code…" : locked ? "⏳ Syncing…" : "Sign In →"}
            </button>

            <div className="hint-box">
              <strong>Username:</strong> your last name, full email, or EID.<br />
              <strong>Password:</strong> use your provided password on first login.<br />
              Contact ADJ if you need a password reset.
            </div>
          </>
        ) : (
          <>
            <div className="login-sub">Two-factor verification</div>

            {mfaInfo && (
              <div style={{ background:"rgba(39,174,96,0.1)", border:"1.5px solid #27AE60", borderRadius:"6px", padding:"0.55rem 0.9rem", fontSize:"0.84rem", color:"#1e8449", marginBottom:"0.9rem" }}>
                ✉ {mfaInfo}
              </div>
            )}
            {err && banner("⚠ " + err, "192,57,43")}

            <div className="input-group">
              <label className="input-label" htmlFor="login-mfa">Verification Code</label>
              <input
                id="login-mfa"
                name="mfa-code"
                className="input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={mfaCode}
                disabled={mfaLoading}
                style={mfaLoading ? { opacity:0.45, cursor:"not-allowed" } : {}}
                onChange={e => setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                onKeyDown={e => e.key === "Enter" && verifyCode()}
                autoFocus
              />
            </div>
            <button
              className="btn btn-orange"
              style={{ width:"100%", justifyContent:"center", marginTop:"0.25rem", opacity:mfaLoading ? 0.45 : 1, cursor:mfaLoading ? "not-allowed" : "pointer", fontFamily:"'Barlow', 'Segoe UI', sans-serif", letterSpacing:"normal", textTransform:"none" }}
              disabled={mfaLoading}
              onClick={verifyCode}
            >
              {mfaLoading ? "⏳ Verifying…" : "Verify & Sign In →"}
            </button>

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:"0.75rem", fontSize:"0.83rem" }}>
              <button
                onClick={() => { setMfaStep(false); setMfaUser(null); setMfaCode(""); setErr(""); setMfaInfo(""); }}
                style={{ background:"none", border:"none", color:"#666", cursor:"pointer", padding:0, textDecoration:"underline" }}
              >
                ← Back
              </button>
              <button
                onClick={resendCode}
                disabled={mfaLoading}
                style={{ background:"none", border:"none", color:"#BF5700", cursor:mfaLoading ? "not-allowed" : "pointer", padding:0, textDecoration:"underline", opacity:mfaLoading ? 0.45 : 1 }}
              >
                Resend code
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Dashboard({ onNav, userList, chits, forms, reminder, setReminder }) {
  const { user } = useAuth();
  const canManageReminder = isBigFour(user);
  const [editingReminder, setEditingReminder] = useState(false);
  const [draftText, setDraftText] = useState(reminder.text);
  const liveEvents = useCalendarEvents();
  const upcomingEvents = liveEvents.length > 0 ? liveEvents : POTW.operations;

  const saveReminder = () => {
    setReminder({ enabled: draftText.trim().length > 0, text: draftText.trim() });
    setEditingReminder(false);
  };

  return (
    <div>
      <div className="page-title">BN <span>Dashboard</span></div>
      <div className="page-sub">Welcome, {user.rank} {user.name} — Spring 2026</div>

      {/* Reminder — visible to all when enabled; Big Four can manage it */}
      {reminder.enabled && reminder.text && (
        <div className="alert">
          🔔 <strong>Reminder:</strong> {reminder.text}
        </div>
      )}
      {canManageReminder && (
        <div style={{ marginBottom:"1rem" }}>
          {editingReminder ? (
            <div className="stage-action-box">
              <div className="stage-action-label">BN Reminder</div>
              <textarea
                className="input"
                style={{ minHeight:"60px", resize:"vertical", marginBottom:"0.5rem", fontSize:"0.85rem" }}
                placeholder="Type reminder text… (leave blank to hide)"
                value={draftText}
                onChange={e => setDraftText(e.target.value)}
              />
              <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                <button className="btn btn-green btn-sm" onClick={saveReminder}>Save</button>
                {reminder.enabled && (
                  <button className="btn btn-red btn-sm" onClick={() => { setReminder({ enabled:false, text:"" }); setDraftText(""); setEditingReminder(false); }}>Turn Off</button>
                )}
                <button className="btn btn-outline btn-sm" onClick={() => { setDraftText(reminder.text); setEditingReminder(false); }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="btn btn-outline btn-sm" onClick={() => { setDraftText(reminder.text); setEditingReminder(true); }}>
              {reminder.enabled ? "✏ Edit Reminder" : "+ Add Reminder"}
            </button>
          )}
        </div>
      )}

      <div className="grid3" style={{ marginBottom:"1rem" }}>
        <div className="stat"><div className="stat-n">{userList.length}</div><div className="stat-l">BN Strength</div></div>
        <div className="stat" style={{ borderLeftColor:"#0D1B2A" }}><div className="stat-n" style={{ color:"#0D1B2A" }}>{chits.filter(c => c.status !== "Complete").length}</div><div className="stat-l">Open CHITs</div></div>
        <div className="stat" style={{ borderLeftColor:"#2A7D4F" }}><div className="stat-n" style={{ color:"#2A7D4F" }}>{forms.length}</div><div className="stat-l">Active Forms</div></div>
      </div>

      <div className="grid2">
        <div>
          <div className="potw-card">
            {(() => { const mon = getCurrentWeekMonday(); return (<>
              <div className="potw-week">📖 Week {getWeekNumber(mon)} — {SEMESTER_LABEL}</div>
              <div className="potw-title">POTW: {formatWeekRange(mon)}</div>
            </>); })()}
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">📅 Upcoming Events</span>
              <button className="btn btn-outline btn-sm" onClick={() => onNav("calendar")}>View All</button>
            </div>
            {upcomingEvents.slice(0,4).map((e,i) => (
              <div className="event-row" key={i}>
                <div className="event-date"><div className="event-day">{e.date.split(" ")[0]}</div><div className="event-mo">{e.date.split(" ")[1] || ""}</div></div>
                <div style={{ flex:1 }}>
                  <div className="event-title">{e.title}</div>
                  <div className="event-sub">{e.time}{e.location ? ` · ${e.location}` : ""}</div>
                </div>
                <span className="badge badge-navy">{e.type}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="card">
            <div className="card-header"><span className="card-title">📋 My CHITs</span><button className="btn btn-outline btn-sm" onClick={() => onNav("chits")}>Open</button></div>
            <div style={{ fontSize:"0.83rem", color:"#666" }}>🔒 Private — only visible to you and your chain of command.</div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">❓ Academic Board</span><button className="btn btn-outline btn-sm" onClick={() => onNav("academic")}>Open</button></div>
            <div style={{ fontSize:"0.88rem" }}>Questions needing answers: <strong style={{ color:"#BF5700" }}>1</strong></div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">📝 Open Forms</span><button className="btn btn-outline btn-sm" onClick={() => onNav("forms")}>View</button></div>
            <div style={{ fontSize:"0.88rem" }}>{forms.length} form{forms.length !== 1 ? "s" : ""} posted for your response.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// CalendarPage: embeds the live Google Calendar for the battalion.
function CalendarPage() {
  const mon = getCurrentWeekMonday();
  const weekNum = getWeekNumber(mon);
  const weekLabel = `Week ${weekNum} — ${SEMESTER_LABEL}`;
  const calSrc = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(GCAL_CALENDAR_ID)}&ctz=America/Chicago&mode=WEEK&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&color=%23BF5700`;

  return (
    <div>
      <div className="page-title"><span>POTW</span></div>
      <div className="potw-card">
        <div className="potw-week">📖 {weekLabel}</div>
        <div className="potw-title">{formatWeekRange(mon)}</div>
      </div>
      <div style={{ background: "#BF5700", borderRadius: "10px", padding: "3px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "1rem" }}>
        <iframe
          src={calSrc}
          style={{ border: 0, width: "100%", height: "600px", borderRadius: "8px", display: "block" }}
          title="Battalion Calendar"
        />
      </div>
    </div>
  );
}

function StructurePage({ userList }) {
  const [open, setOpen] = useState({});
  const [billetsOpen, setBilletsOpen] = useState(true);

  // Helper: find user(s) by role/billet
  const byRole = (role) => userList.filter(u => u.role === role);
  const fmt = (u) => u ? `${u.rank} ${u.name}` : "—";

  // Big Four: BNCO → BNXO → OPS → SEL
  const bnco = byRole("bn_cdr")[0];
  const bnxo = byRole("xo")[0];
  const ops  = byRole("ops")[0];
  const sel  = userList.find(u => u.role === "sel" && u.company === "BN");

  const billetHolders = STRUCTURE_BILLET_ORDER.flatMap(billet =>
    userList.filter(u => getBilletLabel(u) === billet)
  );

  // Company definitions derived from live data
  const COMPANY_DEFS = [
    { key: "Alpha",   name: getCompanyFullName("Alpha"),   color: COMPANY_COLORS.Alpha },
    { key: "Bravo",   name: getCompanyFullName("Bravo"),   color: COMPANY_COLORS.Bravo },
    { key: "Charlie", name: getCompanyFullName("Charlie"), color: COMPANY_COLORS.Charlie },
  ];

  // Build companies dynamically from userList
  const companies = COMPANY_DEFS.map(def => {
    const members = userList.filter(u => normalizeCompany(u.company) === def.key);
    const co  = members.find(u => u.role === "co_cdr");
    const sel = members.find(u => u.role === "sel");

    // Group platoons by platoon field matching "Xst/nd/rd/th PC"
    const platoonNames = [...new Set(members.map(u => u.platoon).filter(p => /\d+(st|nd|rd|th) PC/i.test(p)))].sort();
    const platoons = platoonNames.map(pName => {
      const pMembers = members.filter(u => u.platoon === pName);
      const pc = pMembers.find(u => u.role === "plt_cdr");
      // Display name: "1st PC" → "1st PLT"
      const displayName = pName.replace(/ PC$/i, " PLT");
      return { name: displayName, pc, total: pMembers.length };
    });

    return { ...def, co, sel, platoons, total: members.length };
  });

  const grandTotal = userList.length;

  return (
    <div>
      <div className="page-title">BN <span>Structure</span></div>
      <div className="page-sub">The Quarterdeck — {grandTotal} Personnel</div>

      {/* Big Four */}
      <div className="card" style={{ padding:"1rem 1.2rem", marginBottom:"1rem" }}>
        <div style={{ fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"1.5px", color:"#888", marginBottom:"0.6rem", fontWeight:600 }}>Battalion Leadership</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:"0.75rem" }}>
          {[
            { label:"BNCO", user:bnco },
            { label:"BNXO", user:bnxo },
            { label:"OPS",  user:ops },
            { label:"SEL",  user:sel },
          ].map(({ label, user:u }) => (
            <div key={label} style={{ background:"#f8f8f8", borderRadius:"8px", padding:"0.6rem 0.8rem", borderLeft:"3px solid #BF5700" }}>
              <div style={{ fontSize:"0.68rem", textTransform:"uppercase", letterSpacing:"1px", color:"#BF5700", fontWeight:700 }}>{label}</div>
              <div style={{ fontSize:"0.88rem", fontWeight:600, marginTop:"0.15rem" }}>{u ? fmt(u) : "—"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Stats */}
      <div className="grid3" style={{ marginBottom:"1rem" }}>
        {companies.map((co, i) => (
          <div className="stat" key={i} style={{ borderLeftColor: co.color }}>
            <div className="stat-n" style={{ color: co.color }}>{co.total}</div>
            <div className="stat-l">{co.name}</div>
          </div>
        ))}
      </div>

      {/* Billets Section */}
      <div className="company-block">
        <div className="company-header" style={{ background:"#333" }} onClick={() => setBilletsOpen(s => !s)}>
          <div>
            <div className="company-name">Billet Holders</div>
            <div className="company-co">{billetHolders.length} billets assigned</div>
          </div>
          <span>{billetsOpen ? "▲" : "▼"}</span>
        </div>
        {billetsOpen && (
          <div style={{ padding:"0.75rem 1rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"0.5rem" }}>
              {billetHolders.map((u, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.45rem 0.7rem", background:"#f8f8f8", borderRadius:"6px", fontSize:"0.82rem" }}>
                  <span style={{ fontWeight:600 }}>{fmt(u)}</span>
                  <span className="badge badge-orange" style={{ fontSize:"0.68rem" }}>{getBilletLabel(u)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Companies - Collapsible */}
      {companies.map((co, ci) => (
        <div className="company-block" key={ci}>
          <div className="company-header" style={{ background: co.color }} onClick={() => setOpen(s => ({ ...s, [ci]: !s[ci] }))}>
            <div>
              <div className="company-name">{co.name}</div>
              <div className="company-co">
                CO: {co.co ? fmt(co.co) : "—"}
                {co.sel ? ` · SEL: ${fmt(co.sel)}` : ""}
              </div>
            </div>
            <span>{open[ci] ? "▲" : "▼"}</span>
          </div>
          {open[ci] && (
            <div className="platoon-grid">
              {co.platoons.map((p, pi) => (
                <div className="platoon-card" key={pi}>
                  <div className="platoon-name">{p.name}</div>
                  <div className="platoon-detail">PC: {p.pc ? fmt(p.pc) : "—"}</div>
                  <div style={{ marginTop:"0.4rem" }}>
                    <span className="badge badge-orange">{p.total} Member{p.total !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TrainingPage({ ptPlans, setPtPlans, llSessions, setLlSessions }) {
  const { user } = useAuth();
  const canUploadPT = canEdit(user, "pt");     // OPS, PTO, and other seniors
  const canEditLL   = user.role === "traino";  // TRAINO only for LL notes

  const [tab, setTab]           = useState("pt");
  const [toast, setToast]       = useState("");
  const [editingLL, setEditingLL] = useState(null); // id of session being edited
  const [llDraft, setLlDraft]   = useState({});
  const [showAddLL, setShowAddLL] = useState(false);
  const [newLL, setNewLL]       = useState({ title:"", date:"", notes:"" });

  const fire = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  // ── PT upload / remove ──────────────────────────────────────
  const handlePTUpload = (key, file) => {
    if (!file) return;
    if (file.type !== "application/pdf") { fire("⚠ Please select a PDF file."); return; }
    const reader = new FileReader();
    reader.onload = e => {
      setPtPlans(prev => ({
        ...prev,
        [key]: { fileName: file.name, dataUrl: e.target.result, uploadedBy: user.name, uploadedAt: new Date().toLocaleDateString() },
      }));
      fire("✅ PT plan uploaded.");
    };
    reader.readAsDataURL(file);
  };

  const removePTPlan = key => {
    setPtPlans(prev => ({ ...prev, [key]: null }));
    fire("PT plan removed.");
  };

  // ── LL session management ───────────────────────────────────
  const startEditLL = ll => {
    setEditingLL(ll.id);
    setLlDraft({ title: ll.title, date: ll.date, notes: ll.notes });
  };

  const saveEditLL = () => {
    setLlSessions(prev => prev.map(s => s.id === editingLL ? { ...s, ...llDraft } : s));
    setEditingLL(null);
    fire("✅ Session updated.");
  };

  const addLLSession = () => {
    if (!newLL.title || !newLL.date) return;
    setLlSessions(prev => [...prev, { id: Date.now(), ...newLL }]);
    setNewLL({ title:"", date:"", notes:"" });
    setShowAddLL(false);
    fire("✅ Leadership Lab session added.");
  };

  const deleteLLSession = id => {
    setLlSessions(prev => prev.filter(s => s.id !== id));
    fire("Session removed.");
  };

  return (
    <div>
      <div className="page-title">Training <span>Plans</span></div>
      <div className="page-sub">Weekly PT schedules and Leadership Lab notes</div>

      {toast && <div className="alert alert-green">{toast}</div>}

      {/* Tab bar */}
      <div style={{ display:"flex", borderBottom:"2px solid #eee", marginBottom:"1.25rem" }}>
        {[["pt","PT Plan"],["leadlab","LL"]].map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:"0.5rem 1.2rem", fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.8rem", letterSpacing:"1.5px",
            textTransform:"uppercase", cursor:"pointer", background:"none", border:"none",
            borderBottom: tab===t ? "2px solid #BF5700" : "2px solid transparent",
            color: tab===t ? "#BF5700" : "#888", marginBottom:"-2px",
          }}>{label}</button>
        ))}
      </div>

      {/* ── PT PLAN TAB ─────────────────────────────────────── */}
      {tab === "pt" && (
        <div>
          {canUploadPT && (
            <div className="alert">
              ✏ <strong>OPS / PTO — Upload Mode:</strong> Use the buttons below to post this week's PT plan PDFs.
            </div>
          )}

          {PT_SESSIONS.map(s => {
            const plan = ptPlans[s.key];
            const inputId = `pt-file-${s.key}`;
            return (
              <div key={s.key} style={{ background:"white", borderRadius:"10px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", border:"1px solid rgba(191,87,0,0.1)", borderTop:`4px solid ${s.color}`, padding:"1.25rem", marginBottom:"1.25rem" }}>
                {/* Session header */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem", marginBottom:"0.9rem" }}>
                  <div>
                    <div style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"1.05rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px" }}>
                      {s.day} — <span style={{ color: s.color }}>{s.type}</span>
                    </div>
                    <div style={{ fontSize:"0.78rem", color:"#888", marginTop:"2px" }}>{s.desc}</div>
                  </div>
                  {canUploadPT && (
                    <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
                      <label htmlFor={inputId} className="btn btn-orange btn-sm" style={{ cursor:"pointer" }}>
                        ↑ {plan ? "Replace PDF" : "Upload PDF"}
                      </label>
                      <input
                        id={inputId} type="file" accept=".pdf,application/pdf"
                        style={{ display:"none" }}
                        onChange={e => { handlePTUpload(s.key, e.target.files[0]); e.target.value = ""; }}
                      />
                      {plan && (
                        <button className="btn btn-outline btn-sm" onClick={() => removePTPlan(s.key)}>✕ Remove</button>
                      )}
                    </div>
                  )}
                </div>

                {/* PDF viewer or empty state */}
                {plan ? (
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.65rem", flexWrap:"wrap" }}>
                      <span style={{ fontSize:"0.78rem", color:"#2A7D4F", fontWeight:600 }}>📄 {plan.fileName}</span>
                      <span style={{ fontSize:"0.72rem", color:"#aaa" }}>Uploaded by {plan.uploadedBy} · {plan.uploadedAt}</span>
                      <a href={plan.dataUrl} download={plan.fileName} className="btn btn-outline btn-sm">⬇ Download</a>
                    </div>
                    <iframe
                      src={plan.dataUrl}
                      title={`${s.day} ${s.type} Plan`}
                      style={{ width:"100%", height:"620px", border:"1px solid #eee", borderRadius:"6px", display:"block" }}
                    />
                  </div>
                ) : (
                  <div style={{ textAlign:"center", padding:"2.5rem 1rem", background:"#faf8f5", borderRadius:"8px", border:"2px dashed #e0d8d0" }}>
                    <div style={{ fontSize:"2.2rem", marginBottom:"0.4rem" }}>📋</div>
                    <div style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.82rem", letterSpacing:"1px", textTransform:"uppercase", color:"#bbb" }}>
                      No plan uploaded for this week
                    </div>
                    {canUploadPT && (
                      <div style={{ fontSize:"0.78rem", color:"#BF5700", marginTop:"0.4rem" }}>
                        Use the Upload PDF button above.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── LEADLAB TAB ─────────────────────────────────────── */}
      {tab === "leadlab" && (
        <div>
          {canEditLL && (
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem", flexWrap:"wrap", gap:"0.5rem" }}>
              <span style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.72rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#BF5700" }}>
                ✏ TRAINO — you can add and edit sessions
              </span>
              <button className="btn btn-orange btn-sm" onClick={() => setShowAddLL(true)}>+ Add Session</button>
            </div>
          )}

          {llSessions.length === 0 && (
            <div className="empty">
              <div style={{ fontSize:"2rem" }}>🗺</div>
              <div style={{ marginTop:"0.5rem" }}>No Leadership Lab sessions scheduled yet.</div>
            </div>
          )}

          {llSessions.map(ll => (
            <div className="card" key={ll.id} style={{ marginBottom:"1rem" }}>
              {editingLL === ll.id ? (
                /* ── Edit mode (TRAINO only) ── */
                <div>
                  <div style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.72rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#BF5700", marginBottom:"0.75rem" }}>
                    ✏ Editing Session
                  </div>
                  <div className="input-group">
                    <label className="input-label">Title</label>
                    <input className="input" value={llDraft.title} onChange={e => setLlDraft(d => ({ ...d, title:e.target.value }))} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Date</label>
                    <input className="input" type="date" value={llDraft.date} onChange={e => setLlDraft(d => ({ ...d, date:e.target.value }))} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Notes</label>
                    <textarea
                      className="input" style={{ minHeight:"100px", resize:"vertical" }}
                      value={llDraft.notes}
                      onChange={e => setLlDraft(d => ({ ...d, notes:e.target.value }))}
                    />
                  </div>
                  <div style={{ display:"flex", gap:"0.5rem", justifyContent:"flex-end" }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setEditingLL(null)}>Cancel</button>
                    <button className="btn btn-orange btn-sm" onClick={saveEditLL}>Save</button>
                  </div>
                </div>
              ) : (
                /* ── View mode ── */
                <div>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem", marginBottom: ll.notes ? "0.75rem" : 0 }}>
                    <div>
                      <div style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"1rem", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase" }}>{ll.title}</div>
                      <span className="badge badge-orange" style={{ marginTop:"0.3rem" }}>{ll.date}</span>
                    </div>
                    {canEditLL && (
                      <div style={{ display:"flex", gap:"0.4rem" }}>
                        <button className="btn btn-outline btn-sm" onClick={() => startEditLL(ll)}>✏ Edit</button>
                        <button className="btn btn-sm" style={{ background:"transparent", border:"1.5px solid #C0392B", color:"#C0392B" }} onClick={() => deleteLLSession(ll.id)}>🗑</button>
                      </div>
                    )}
                  </div>
                  {ll.notes ? (
                    <div style={{ background:"#f5f2ee", borderRadius:"6px", padding:"0.65rem 0.85rem", fontSize:"0.85rem", color:"#555", lineHeight:1.6 }}>
                      {ll.notes}
                    </div>
                  ) : (
                    canEditLL && (
                      <div style={{ fontSize:"0.78rem", color:"#aaa" }}>No notes yet — click Edit to add.</div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add session modal */}
          {showAddLL && (
            <Modal title="Add Leadership Lab Session" onClose={() => setShowAddLL(false)}>
              <div className="input-group">
                <label className="input-label">Title</label>
                <input className="input" placeholder="e.g. Land Navigation" value={newLL.title} onChange={e => setNewLL(s => ({ ...s, title:e.target.value }))} />
              </div>
              <div className="input-group">
                <label className="input-label">Date</label>
                <input className="input" type="date" value={newLL.date} onChange={e => setNewLL(s => ({ ...s, date:e.target.value }))} />
              </div>
              <div className="input-group">
                <label className="input-label">Notes</label>
                <textarea className="input" style={{ minHeight:"90px", resize:"vertical" }}
                  placeholder="Equipment, uniform, location, objectives…"
                  value={newLL.notes} onChange={e => setNewLL(s => ({ ...s, notes:e.target.value }))}
                />
              </div>
              <div style={{ display:"flex", gap:"0.75rem", justifyContent:"flex-end" }}>
                <button className="btn btn-outline" onClick={() => setShowAddLL(false)}>Cancel</button>
                <button className="btn btn-orange" onClick={addLLSession}>Add Session</button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

function ChitsPage({ chits, setChits, userList }) {
  const { user } = useAuth();
  const canSubmit = canSubmitChit(user);
  const needsRouteSelect = requiresChitRouteSelection(user);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ startDate:"", endDate:"", reason:"", notes:"", routeCompany:"", routePlatoon:"", routingSheet:null, chitDoc:null });
  const [chitSubmitAttempted, setChitSubmitAttempted] = useState(false);
  const [activeComment, setActiveComment] = useState(null);
  const [commentText, setCommentText] = useState("");

  // Only show CHITs the logged-in user is permitted to see (routing line + subject)
  const visible = chits.filter(c => canViewChit(user, c));

  const fire = msg => { setToast(msg); setTimeout(() => setToast(""), 3500); };

  const loadChitFile = (field, file, allowedTypes, errorMsg) => {
    if (!file || !allowedTypes.includes(file.type)) { fire(errorMsg); return; }
    const reader = new FileReader();
    reader.onload = e => setForm(s => ({ ...s, [field]: { fileName: file.name, dataUrl: e.target.result } }));
    reader.readAsDataURL(file);
  };

  const getPlatoons = (company) => {
    const pcs = userList.filter(u => normalizeCompany(u.company) === company && u.role === "plt_cdr");
    return [...new Set(pcs.map(u => normalizePlatoon(u.platoon)).filter(Boolean))].sort();
  };

  const routeHint = () => {
    if (user.role === "adj")    return "BNXO → BNCO";
    if (user.role === "co_cdr") return "ADJ → BNXO → BNCO";
    if (user.role === "plt_cdr") return "CC → ADJ → BNXO → BNCO";
    return "PC → CC → ADJ → BNXO → BNCO";
  };

  const submit = () => {
    setChitSubmitAttempted(true);
    if (!form.startDate || !form.reason) {
      fire("⚠ Start Date and Reason are required."); return;
    }
    if (form.reason === "Other" && !form.notes.trim()) {
      fire("⚠ Notes are required when reason is 'Other'."); return;
    }
    if (!form.routingSheet || !form.chitDoc) {
      fire("⚠ Both documents are required: Routing Sheet and CHIT Document."); return;
    }
    if (needsRouteSelect && (!form.routeCompany || !form.routePlatoon)) {
      fire("⚠ Please select your company and platoon."); return;
    }
    const routeContext = resolveChitRoutingContext(user, form);
    const approvalChain = buildChitApprovalChain(userList, user, routeContext);
    if (approvalChain.length === 0) {
      fire("⚠ Could not build approval chain. Ensure your company/platoon has assigned personnel."); return;
    }
    const now = new Date().toISOString().split("T")[0];
    const stages = buildChitStages(user.name, now, approvalChain);
    const c = {
      id: "CHT-" + String(chits.length + 1).padStart(3, "0"),
      userId: user.id,
      name: user.name,
      company: routeContext.company,
      platoon: routeContext.platoon,
      date: form.endDate && form.endDate !== form.startDate ? `${form.startDate} – ${form.endDate}` : form.startDate,
      reason: form.reason,
      notes: form.notes,
      status: "Pending",
      currentStage: 1,
      stages,
      docs: { routingSheet: form.routingSheet, chitDoc: form.chitDoc },
    };
    setChits(prev => [...prev, c]);
    setShowModal(false);
    setForm({ startDate:"", endDate:"", reason:"", notes:"", routeCompany:"", routePlatoon:"", routingSheet:null, chitDoc:null });
    setChitSubmitAttempted(false);
    fire("✅ CHIT submitted and routed to your chain of command.");
  };

  const advanceStage = (id, action) => {
    const comment = commentText.trim();
    setChits(prev => prev.map(c => {
      if (c.id !== id) return c;
      const updated = [...c.stages];
      updated[c.currentStage] = {
        ...updated[c.currentStage],
        completedBy: user.name,
        completedAt: new Date().toISOString().split("T")[0],
        comment,
      };
      const next = action === "returned"
        ? c.currentStage   // stay at denial stage so audit trail is visible
        : Math.min(c.currentStage + 1, c.stages.length - 1);
      const status = action === "returned" ? "Returned"
        : next === c.stages.length - 1 ? "Approved"
        : "Pending";
      return { ...c, currentStage: next, stages: updated, status };
    }));
    setActiveComment(null);
    setCommentText("");
    fire("CHIT updated.");
  };

  return (
    <div>
      <div className="page-title"><span>CHITs</span></div>
      <div className="page-sub">Submit and track absence requests</div>

      {toast && <div className="alert alert-green">{toast}</div>}

      <div className="privacy-note">
        🔒 <strong>Private.</strong> Only you and your chain of command can see your CHITs.
      </div>

      {canSubmit && (
        <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"1rem" }}>
          <button className="btn btn-orange" onClick={() => setShowModal(true)}>+ Submit New CHIT</button>
        </div>
      )}

      {visible.length === 0 && (
        <div className="empty">
          <div style={{ fontSize:"2rem" }}>📋</div>
          <div style={{ marginTop:"0.5rem" }}>No CHITs on file.</div>
        </div>
      )}

      {visible.map((c, i) => {
        const canAct = canActOnChit(user, c);
        const isDone = c.status === "Approved" || c.status === "Denied" || c.status === "Returned";
        const currentStageName = c.stages?.[c.currentStage]?.name || "";

        return (
          <div className="chit-card" key={i}>
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem", marginBottom:"0.3rem" }}>
              <div>
                <strong>{c.id}</strong>
                <span style={{ color:"#888", fontSize:"0.82rem", marginLeft:"0.75rem" }}>
                  {c.name} · {formatCompanyCoLabel(c.company)}, {formatPlatoonLabel(c.platoon)}
                </span>
              </div>
              <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
                <span className={`badge ${c.status==="Approved" ? "badge-green" : c.status==="Denied" || c.status==="Returned" ? "badge-red" : "badge-orange"}`}>{c.status}</span>
                {canAct && !isDone && <span className="badge" style={{ background:"rgba(42,125,79,0.15)", color:"#2A7D4F" }}>● Your Action</span>}
              </div>
            </div>
            <div style={{ fontSize:"0.82rem", color:"#666" }}>{c.reason} · Absent: {c.date}</div>
            {c.notes && <div style={{ fontSize:"0.8rem", color:"#888", marginTop:"0.2rem" }}>{c.notes}</div>}

            {/* Attached documents */}
            {c.docs && (
              <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", alignItems:"center", marginTop:"0.55rem" }}>
                <span style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.65rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#888" }}>Docs:</span>
                {c.docs.routingSheet && (
                  <a href={c.docs.routingSheet.dataUrl} download={c.docs.routingSheet.fileName} className="btn btn-outline btn-sm">📄 Routing Sheet</a>
                )}
                {c.docs.chitDoc && (
                  <a href={c.docs.chitDoc.dataUrl} download={c.docs.chitDoc.fileName} className="btn btn-outline btn-sm">📄 CHIT Document</a>
                )}
              </div>
            )}

            {/* Stage tracker */}
            {c.stages && (
              <div className="stage-track" style={{ marginTop:"0.75rem" }}>
                {c.stages.map((s, j) => {
                  const done     = j < c.currentStage;
                  const returned = j === c.currentStage && c.status === "Returned";
                  const active   = j === c.currentStage && !isDone;
                  return (
                    <div key={j} className={`stage-item ${done ? "done" : returned ? "returned" : active ? "active" : ""}`}>
                      <div className={`stage-dot ${done ? "done" : returned ? "returned" : active ? "active" : "pending"}`}>
                        {done ? "✓" : returned ? "↩" : s.icon}
                      </div>
                      <div className={`stage-label ${done ? "done" : returned ? "returned" : active ? "active" : ""}`}>{s.name}</div>
                      {active && canAct && <div className="stage-approver active">● You</div>}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Completed stage comments */}
            {c.stages?.some(s => s.completedBy && s.comment) && (
              <div style={{ marginTop:"0.5rem" }}>
                {c.stages.map((s, j) => s.completedBy && s.comment ? (
                  <div className="stage-comment" key={j}>
                    <div className="stage-comment-by">{s.name} · {s.completedBy} · {s.completedAt}</div>
                    {s.comment}
                  </div>
                ) : null)}
              </div>
            )}

            {/* Action box for current approver */}
            {canAct && !isDone && (
              <div className="stage-action-box" style={{ marginTop:"0.75rem" }}>
                <div className="stage-action-label">⭐ Your Review — {currentStageName}</div>
                {activeComment === c.id ? (
                  <>
                    <textarea
                      className="input"
                      style={{ minHeight:"70px", resize:"vertical", marginBottom:"0.65rem", fontSize:"0.85rem" }}
                      placeholder="Add comments (optional)…"
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                    />
                    <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                      <button className="btn btn-green btn-sm" onClick={() => advanceStage(c.id, "approved")}>✓ Approve</button>
                      <button className="btn btn-red btn-sm" onClick={() => advanceStage(c.id, "returned")}>↩ Return to Originator</button>
                      <button className="btn btn-outline btn-sm" onClick={() => { setActiveComment(null); setCommentText(""); }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <button className="btn btn-orange btn-sm" onClick={() => { setActiveComment(c.id); setCommentText(""); }}>
                    ✏ Review CHIT
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      {showModal && (
        <Modal title="Submit CHIT" onClose={() => setShowModal(false)}>
          <div className="privacy-note">🔒 Private — only you and your CoC will see this.</div>
          {needsRouteSelect && (
            <>
              <div className="input-group">
                <label className="input-label">Your Company</label>
                <select className="input" value={form.routeCompany} onChange={e => setForm(s => ({ ...s, routeCompany:e.target.value, routePlatoon:"" }))}>
                  <option value="">Select company…</option>
                  {["Alpha","Bravo","Charlie"].map(co => <option key={co} value={co}>{co}</option>)}
                </select>
              </div>
              {form.routeCompany && (
                <div className="input-group">
                  <label className="input-label">Your Platoon</label>
                  <select className="input" value={form.routePlatoon} onChange={e => setForm(s => ({ ...s, routePlatoon:e.target.value }))}>
                    <option value="">Select platoon…</option>
                    {getPlatoons(form.routeCompany).map(p => <option key={p} value={p}>{formatPlatoonLabel(p)}</option>)}
                  </select>
                </div>
              )}
            </>
          )}
          <div className="input-group">
            <label className="input-label">Start Date <span style={{ color:"#C0392B" }}>*</span></label>
            <input className="input" type="date" value={form.startDate} onChange={e => setForm(s => ({ ...s, startDate:e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="input-label">End Date <span style={{ fontSize:"0.75rem", color:"#888" }}>(leave blank if single day)</span></label>
            <input className="input" type="date" value={form.endDate} min={form.startDate} onChange={e => setForm(s => ({ ...s, endDate:e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="input-label">Reason <span style={{ color:"#C0392B" }}>*</span></label>
            <select className="input" value={form.reason} onChange={e => setForm(s => ({ ...s, reason:e.target.value }))}>
              <option value="">Select reason…</option>
              <option>Medical Appointment</option>
              <option>Academic Conflict</option>
              <option>Family Emergency</option>
              <option>Personal Emergency</option>
              <option>Other</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Notes {form.reason === "Other" ? <span style={{ color:"#C0392B" }}>*</span> : "(optional)"}</label>
            <textarea className="input" style={{ minHeight:"80px", resize:"vertical" }} value={form.notes} onChange={e => setForm(s => ({ ...s, notes:e.target.value }))} placeholder={form.reason === "Other" ? "Please explain the reason for your absence" : ""} />
          </div>

          {/* ── Required PDFs ── */}
          <div style={{ borderTop:"1px solid #eee", paddingTop:"0.85rem", marginTop:"0.25rem" }}>
            <div style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.72rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#888", marginBottom:"0.65rem" }}>
              Required Documents
            </div>

            {/* Routing Sheet */}
            <div className="input-group">
              <label className="input-label">
                Routing Sheet <span style={{ color:"#C0392B" }}>*</span>
              </label>
              <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", flexWrap:"wrap" }}>
                <label htmlFor="chit-routing-sheet" className="btn btn-outline btn-sm" style={{ cursor:"pointer" }}>
                  {form.routingSheet ? "↑ Replace DOCX" : "↑ Upload DOCX"}
                </label>
                <input
                  id="chit-routing-sheet" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  style={{ display:"none" }}
                  onChange={e => { loadChitFile("routingSheet", e.target.files[0], ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"], "⚠ Please select a DOCX file."); e.target.value = ""; }}
                />
                {form.routingSheet
                  ? <span style={{ fontSize:"0.78rem", color:"#2A7D4F", fontWeight:600 }}>📄 {form.routingSheet.fileName}</span>
                  : <span style={{ fontSize:"0.75rem", color:"#C0392B" }}>Required</span>
                }
              </div>
            </div>

            {/* CHIT Document */}
            <div className="input-group">
              <label className="input-label">
                CHIT Document <span style={{ color:"#C0392B" }}>*</span>
              </label>
              <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", flexWrap:"wrap" }}>
                <label htmlFor="chit-doc" className="btn btn-outline btn-sm" style={{ cursor:"pointer" }}>
                  {form.chitDoc ? "↑ Replace PDF" : "↑ Upload PDF"}
                </label>
                <input
                  id="chit-doc" type="file" accept=".pdf,application/pdf"
                  style={{ display:"none" }}
                  onChange={e => { loadChitFile("chitDoc", e.target.files[0], ["application/pdf"], "⚠ Please select a PDF file."); e.target.value = ""; }}
                />
                {form.chitDoc
                  ? <span style={{ fontSize:"0.78rem", color:"#2A7D4F", fontWeight:600 }}>📄 {form.chitDoc.fileName}</span>
                  : <span style={{ fontSize:"0.75rem", color:"#C0392B" }}>Required</span>
                }
              </div>
            </div>
          </div>

          <div style={{ background:"#f5f2ee", borderRadius:"8px", padding:"0.65rem", fontSize:"0.8rem", color:"#666", marginBottom:"1rem" }}>
            Your CHIT routes to: <strong>{routeHint()}</strong>
          </div>
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"flex-end" }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-orange" onClick={submit}>Submit CHIT</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function RosterPage({ userList }) {
  const [q, setQ] = useState("");
  const [co, setCo] = useState("");
  const fil = [...userList]
    .sort(compareRoster)
    .filter(p =>
      (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.rank.toLowerCase().includes(q.toLowerCase())) &&
      (!co || normalizeCompany(p.company) === co)
    );
  return (
    <div>
      <div className="page-title">Recall <span>Roster</span></div>
      <div className="page-sub">BN contact directory — sourced live from Google Sheets</div>
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1rem", flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:"180px" }}>
          <span style={{ position:"absolute", left:"0.7rem", top:"50%", transform:"translateY(-50%)", color:"#aaa" }}>🔍</span>
          <input className="input" style={{ paddingLeft:"2.1rem" }} placeholder="Search name or rank…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="input" style={{ maxWidth:"170px" }} value={co} onChange={e => setCo(e.target.value)}>
          <option value="">All Companies</option>
          <option value="BN">Big Four</option><option value="Alpha">Alpha</option><option value="Bravo">Bravo</option><option value="Charlie">Charlie</option>
        </select>
      </div>
      <div className="card">
        <div style={{ fontSize:"0.78rem", color:"#888", marginBottom:"0.75rem" }}>{fil.length} result{fil.length !== 1 ? "s" : ""}</div>
        {fil.length === 0 && <div className="empty">No results found.</div>}
        {fil.map((p, i) => (
          <div className="roster-row" key={i}>
            <div className="avatar" style={{ background: COMPANY_COLORS[normalizeCompany(p.company)] || "#BF5700" }}>{p.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2)}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:"0.9rem" }}>{p.name}</div>
              <div style={{ fontSize:"0.78rem", color:"#BF5700", fontWeight:600 }}>{p.rank}</div>
              <div style={{ fontSize:"0.78rem", color:"#888" }}>{getRosterDescriptor(p)}</div>
            </div>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginLeft:"auto" }}>
              {p.phone && <a href={"tel:" + p.phone}><button className="btn btn-outline btn-sm">📞 {p.phone}</button></a>}
              {p.email && <a href={"mailto:" + p.email}><button className="btn btn-navy btn-sm">✉ Email</button></a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormsPage({ forms, setForms }) {
  const { user } = useAuth();
  // Big Four (isSenior) + billets excluding PC (plt_cdr) and CC (co_cdr)
  const canManage = isSenior(user) || ["adj", "pto", "traino", "academics"].includes(user.role);

  const [showModal, setShowModal] = useState(false);
  const [toast, setToast]         = useState("");
  const [draft, setDraft]         = useState({ title:"", url:"", category:"Admin", deadline:"" });

  const fire = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const addForm = () => {
    if (!draft.title.trim() || !draft.url.trim()) { fire("⚠ Title and URL are required."); return; }
    setForms(prev => [...prev, {
      id:       Date.now(),
      title:    draft.title.trim(),
      url:      draft.url.trim(),
      category: draft.category,
      deadline: draft.deadline,
      addedBy:  user.name,
      addedAt:  new Date().toLocaleDateString(),
      clicks:   {},   // { [userId]: true } once they click Fill Out
    }]);
    setShowModal(false);
    setDraft({ title:"", url:"", category:"Admin", deadline:"" });
    fire("✅ Form posted to the battalion.");
  };

  const deleteForm = id => {
    setForms(prev => prev.filter(f => f.id !== id));
    fire("Form removed.");
  };

  const handleFillOut = id => {
    const f = forms.find(f => f.id === id);
    if (!f) return;
    // Mark this user as having opened the link
    setForms(prev => prev.map(f => f.id === id
      ? { ...f, clicks: { ...f.clicks, [user.id]: true } }
      : f
    ));
    window.open(f.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <div className="page-title">Forms & <span>Links</span></div>
      <div className="page-sub">Click a link to open the form — your status updates automatically</div>

      {toast && <div className="alert alert-green">{toast}</div>}

      {canManage && (
        <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"1rem" }}>
          <button className="btn btn-orange" onClick={() => setShowModal(true)}>+ Add Form</button>
        </div>
      )}

      {forms.length === 0 && (
        <div className="empty">
          <div style={{ fontSize:"2rem" }}>📝</div>
          <div style={{ marginTop:"0.5rem" }}>No forms posted yet.</div>
          {canManage && (
            <div style={{ fontSize:"0.8rem", color:"#BF5700", marginTop:"0.3rem" }}>
              Use the Add Form button to share a link with the battalion.
            </div>
          )}
        </div>
      )}

      {forms.map(f => {
        const opened = !!f.clicks[user.id];
        return (
          <div className="form-row" key={f.id} style={{ alignItems:"center" }}>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, marginBottom:"0.2rem" }}>{f.title}</div>
              <div style={{ fontSize:"0.78rem", color:"#888" }}>
                <span className="tag">{f.category}</span>
                {f.deadline && <span> · Due: {f.deadline}</span>}
                <span> · Added by {f.addedBy} · {f.addedAt}</span>
              </div>
            </div>

            <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", flexWrap:"wrap" }}>
              {opened
                ? <span className="badge badge-green">✓ Opened</span>
                : <span className="badge" style={{ background:"#f5f2ee", color:"#bbb" }}>Not opened</span>
              }
              <button className="btn btn-orange btn-sm" onClick={() => handleFillOut(f.id)}>
                Fill Out ↗
              </button>
              {canManage && (
                <button
                  className="btn btn-sm"
                  style={{ background:"transparent", border:"1.5px solid #C0392B", color:"#C0392B" }}
                  onClick={() => deleteForm(f.id)}
                >🗑</button>
              )}
            </div>
          </div>
        );
      })}

      {showModal && (
        <Modal title="Add Form" onClose={() => setShowModal(false)}>
          <div className="input-group">
            <label className="input-label">Title <span style={{ color:"#C0392B" }}>*</span></label>
            <input className="input" placeholder="e.g. ACFT Readiness Survey"
              value={draft.title} onChange={e => setDraft(s => ({ ...s, title:e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="input-label">URL <span style={{ color:"#C0392B" }}>*</span></label>
            <input className="input" type="url" placeholder="https://forms.google.com/…"
              value={draft.url} onChange={e => setDraft(s => ({ ...s, url:e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="input-label">Category</label>
            <select className="input" value={draft.category} onChange={e => setDraft(s => ({ ...s, category:e.target.value }))}>
              <option>Admin</option>
              <option>PT</option>
              <option>Training</option>
              <option>Event</option>
              <option>Other</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Deadline (optional)</label>
            <input className="input" type="date"
              value={draft.deadline} onChange={e => setDraft(s => ({ ...s, deadline:e.target.value }))} />
          </div>
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"flex-end" }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-orange" onClick={addForm}>Add Form</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function AcademicPage() {
  const { user } = useAuth();
  const [qs, setQs] = useState(INIT_QS);
  const [showModal, setShowModal] = useState(false);
  const [ansFor, setAnsFor] = useState(null);
  const [filter, setFilter] = useState("");
  const [newQ, setNewQ] = useState({ subject:"", text:"" });
  const [ansText, setAnsText] = useState("");

  const subjects = [...new Set(qs.map(q => q.subject))];
  const visible = qs.filter(q => !filter || q.subject === filter);

  const postQ = () => {
    if (!newQ.subject || !newQ.text) return;
    setQs(prev => [{
      id: Date.now(), authorId: user.id, author: user.name,
      rank: user.rank, subject: newQ.subject, time: "Just now",
      answered: false, text: newQ.text, answers: []
    }, ...prev]);
    setShowModal(false);
    setNewQ({ subject:"", text:"" });
  };

  const postAns = (qid) => {
    if (!ansText.trim()) return;
    setQs(prev => prev.map(q => q.id === qid ? {
      ...q, answered: true,
      answers: [...q.answers, { author: user.name, rank: user.rank, text: ansText }]
    } : q));
    setAnsFor(null);
    setAnsText("");
  };

  return (
    <div>
      <div className="page-title">Academic <span>Help Board</span></div>
      <div className="page-sub">Post questions · Get answers from upperclassmen</div>
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.25rem", flexWrap:"wrap", alignItems:"center" }}>
        <select className="input" style={{ maxWidth:"200px" }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Subjects</option>
          {subjects.map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize:"0.82rem", color:"#888", flex:1 }}>
          {qs.filter(q => !q.answered).length} question{qs.filter(q => !q.answered).length !== 1 ? "s" : ""} need answers
        </span>
        <button className="btn btn-orange" onClick={() => setShowModal(true)}>+ Ask a Question</button>
      </div>

      {visible.map((q, i) => (
        <div className="q-card" key={i}>
          <div className="q-meta">
            <div className="avatar" style={{ width:32, height:32, fontSize:"0.72rem" }}>
              {q.author.split(",")[0]?.[0]}{q.author.split(",")[1]?.trim()?.[0]}
            </div>
            <strong style={{ fontSize:"0.85rem" }}>{q.author}</strong>
            <span className="badge badge-navy">{q.rank}</span>
            <span className="tag">{q.subject}</span>
            <span style={{ fontSize:"0.75rem", color:"#aaa" }}>{q.time}</span>
            <span className={`badge ${q.answered ? "badge-green":"badge-orange"}`} style={{ marginLeft:"auto" }}>
              {q.answered ? "Answered" : "Needs Answer"}
            </span>
          </div>
          <div className="q-text">{q.text}</div>
          {q.answers.length > 0 && (
            <div>
              <div style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.7rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#888", marginBottom:"0.5rem" }}>
                Answers ({q.answers.length})
              </div>
              {q.answers.map((a, j) => (
                <div className="answer-block" key={j}>
                  <div className="answer-author">{a.author} · {a.rank}</div>
                  {a.text}
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop:"0.75rem" }}>
            <button className="btn btn-outline btn-sm" onClick={() => setAnsFor(ansFor === q.id ? null : q.id)}>
              {ansFor === q.id ? "Cancel" : "✏ Add Answer"}
            </button>
          </div>
          {ansFor === q.id && (
            <div style={{ marginTop:"0.75rem" }}>
              <textarea className="input" style={{ minHeight:"80px", resize:"vertical", marginBottom:"0.5rem" }}
                placeholder="Write your answer…" value={ansText} onChange={e => setAnsText(e.target.value)} />
              <button className="btn btn-orange btn-sm" onClick={() => postAns(q.id)}>Post Answer</button>
            </div>
          )}
        </div>
      ))}

      {showModal && (
        <Modal title="Ask a Question" onClose={() => setShowModal(false)}>
          <div className="input-group">
            <label className="input-label">Subject</label>
            <select className="input" value={newQ.subject} onChange={e => setNewQ(s => ({ ...s, subject:e.target.value }))}>
              <option value="">Select subject…</option>
              <option>Calculus I</option><option>Calculus II</option><option>Calculus III</option>
              <option>Physics I</option><option>Physics II</option><option>Chemistry</option>
              <option>Statics</option><option>Naval Science</option><option>Other</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Your Question</label>
            <textarea className="input" style={{ minHeight:"100px", resize:"vertical" }}
              placeholder="Be specific — include what you have already tried…"
              value={newQ.text} onChange={e => setNewQ(s => ({ ...s, text:e.target.value }))} />
          </div>
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"flex-end" }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-orange" onClick={postQ}>Post Question</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── FITREP PAGE ─────────────────────────────────────────────
function FitrepsPage({ fitrebs, setFitrebs, userList }) {
  const { user } = useAuth();
  const canSubmit = canSubmitChit(user); // same Big Four restriction
  const needsRouteSelect = requiresChitRouteSelection(user);
  const [showModal, setShowModal]         = useState(false);
  const [submitForm, setSubmitForm]       = useState({ period:"Spring 2026", notes:"", routeCompany:"", routePlatoon:"", fitrepDoc:null, routingSheet:null });
  const [activeComment, setActiveComment] = useState(null);
  const [commentText, setCommentText]     = useState("");
  const [toast, setToast]                 = useState("");
  const [filter, setFilter]               = useState("");

  const fire = msg => { setToast(msg); setTimeout(() => setToast(""), 3500); };

  const loadFitrepFile = (field, file, allowedTypes, errorMsg) => {
    if (!file || !allowedTypes.includes(file.type)) { fire(errorMsg); return; }
    const reader = new FileReader();
    reader.onload = e => setSubmitForm(s => ({ ...s, [field]: { fileName: file.name, dataUrl: e.target.result } }));
    reader.readAsDataURL(file);
  };

  // Only show FITREPs the user is permitted to see (routing line + subject)
  const visible  = fitrebs.filter(f => canViewFitrep(user, f));
  const filtered = filter ? visible.filter(f => normalizeCompany(f.company) === filter) : visible;

  const getPlatoons = (company) => {
    const pcs = userList.filter(u => normalizeCompany(u.company) === company && u.role === "plt_cdr");
    return [...new Set(pcs.map(u => normalizePlatoon(u.platoon)).filter(Boolean))].sort();
  };

  const routeHint = () => {
    if (user.role === "adj")     return "BNXO → BNCO";
    if (user.role === "co_cdr")  return "ADJ → BNXO → BNCO";
    if (user.role === "plt_cdr") return "CC → ADJ → BNXO → BNCO";
    return "PC → CC → ADJ → BNXO → BNCO";
  };

  const handleSubmit = () => {
    if (!submitForm.period) return;
    if (!submitForm.fitrepDoc || !submitForm.routingSheet) {
      fire("⚠ Both PDFs are required: FITREP Document and Routing Sheet."); return;
    }
    if (needsRouteSelect && (!submitForm.routeCompany || !submitForm.routePlatoon)) {
      fire("⚠ Please select your company and platoon."); return;
    }
    const routeContext = resolveChitRoutingContext(user, submitForm);
    const approvalChain = buildChitApprovalChain(userList, user, routeContext);
    if (approvalChain.length === 0) {
      fire("⚠ Could not build approval chain. Ensure your company/platoon has assigned personnel."); return;
    }
    const now = new Date().toISOString().split("T")[0];
    const stages = buildChitStages(user.name, now, approvalChain);
    const f = {
      id: "FIT-" + String(fitrebs.length + 1).padStart(3, "0"),
      subjectId: user.id,
      subjectName: user.name,
      subjectRank: user.rank,
      company: routeContext.company,
      platoon: routeContext.platoon,
      period: submitForm.period,
      status: "Pending",
      currentStage: 1,
      stages,
      docs: { fitrepDoc: submitForm.fitrepDoc, routingSheet: submitForm.routingSheet },
    };
    setFitrebs(prev => [...prev, f]);
    setShowModal(false);
    setSubmitForm({ period:"Spring 2026", notes:"", routeCompany:"", routePlatoon:"", fitrepDoc:null, routingSheet:null });
    fire("✅ FITREP submitted and routed to your chain of command.");
  };

  const advanceStage = (id, action = "approved") => {
    const comment = commentText.trim();
    setFitrebs(prev => prev.map(f => {
      if (f.id !== id) return f;
      const updated = [...f.stages];
      updated[f.currentStage] = {
        ...updated[f.currentStage],
        completedBy: user.name,
        completedAt: new Date().toISOString().split("T")[0],
        comment,
      };
      const next = action === "returned"
        ? f.currentStage   // stay at denial stage so audit trail is visible
        : Math.min(f.currentStage + 1, f.stages.length - 1);
      const status = action === "returned" ? "Returned"
        : next === f.stages.length - 1 ? "Approved"
        : "Pending";
      return { ...f, currentStage: next, stages: updated, status };
    }));
    setActiveComment(null);
    setCommentText("");
    fire(action === "returned" ? "FITREP returned to originator." : "✅ FITREP advanced. Stage comments saved.");
  };

  const companies = [...new Set(visible.map(f => normalizeCompany(f.company)))];

  return (
    <div>
      <div className="page-title">FITREP <span>Tracker</span></div>
      <div className="page-sub">Fitness Report pipeline — {visible.length} report{visible.length !== 1 ? "s" : ""} visible to you</div>

      {toast && <div className="alert alert-green">{toast}</div>}

      <div className="privacy-note">
        🔒 <strong>Private.</strong> Only you and your chain of command can see your FITREPs.
      </div>

      {/* Summary stats (based on what user can see) */}
      <div className="grid3" style={{ marginBottom:"1rem" }}>
        <div className="stat">
          <div className="stat-n">{visible.filter(f => f.currentStage > 0 && f.currentStage < f.stages.length - 1).length}</div>
          <div className="stat-l">In Progress</div>
        </div>
        <div className="stat" style={{ borderLeftColor:"#2A7D4F" }}>
          <div className="stat-n" style={{ color:"#2A7D4F" }}>{visible.filter(f => f.currentStage === f.stages.length - 1).length}</div>
          <div className="stat-l">Complete</div>
        </div>
        <div className="stat" style={{ borderLeftColor:"#0D1B2A" }}>
          <div className="stat-n" style={{ color:"#0D1B2A" }}>{visible.filter(f => f.currentStage === 1).length}</div>
          <div className="stat-l">Awaiting PC</div>
        </div>
      </div>

      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1rem", flexWrap:"wrap", alignItems:"center" }}>
        {/* Company filter — only show if user can see multiple companies */}
        {companies.length > 1 && (
          <select className="input" style={{ maxWidth:"200px" }} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">All Companies</option>
            {companies.map(c => <option key={c} value={c}>{getCompanyShortName(c)}</option>)}
          </select>
        )}
        <span style={{ fontSize:"0.82rem", color:"#888", flex:1 }}>
          {filtered.length} report{filtered.length !== 1 ? "s" : ""} shown
        </span>
        {canSubmit && (
          <button className="btn btn-orange" onClick={() => setShowModal(true)}>+ Submit FITREP</button>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="empty">
          <div style={{ fontSize:"2rem" }}>📊</div>
          <div style={{ marginTop:"0.5rem" }}>No FITREPs on file.</div>
        </div>
      )}

      {filtered.map(f => {
        const canAct = canActOnFitrep(user, f);
        const isDone = f.currentStage >= f.stages.length - 1 || f.status === "Returned";
        const currentStageName = isDone ? (f.status === "Returned" ? "Returned" : "Complete") : (f.stages?.[f.currentStage]?.name || "");

        return (
          <div className="fitrep-card" key={f.id}>
            {/* Card header */}
            <div className="fitrep-header">
              <div>
                <strong style={{ fontSize:"0.95rem" }}>{f.subjectRank} {f.subjectName}</strong>
                <div style={{ fontSize:"0.78rem", color:"#888", marginTop:"1px" }}>
                  {formatCompanyCoLabel(f.company)} · {formatPlatoonLabel(f.platoon)} · {f.period}
                </div>
              </div>
              <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
                <span className="badge badge-navy">{f.id}</span>
                {f.status === "Returned"
                  ? <span className="badge badge-red">Returned</span>
                  : isDone
                    ? <span className="badge badge-green">Complete</span>
                    : <span className="badge badge-orange">{currentStageName}</span>
                }
                {canAct && !isDone && (
                  <span className="badge" style={{ background:"rgba(42,125,79,0.15)", color:"#2A7D4F" }}>● Your Action</span>
                )}
              </div>
            </div>

            {/* Stage tracker — uses per-fitrep stages */}
            <div className="fitrep-body">
              {/* Attached documents */}
              {f.docs && (
                <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", alignItems:"center", marginBottom:"0.75rem" }}>
                  <span style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.65rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#888" }}>Docs:</span>
                  {f.docs.fitrepDoc && (
                    <a href={f.docs.fitrepDoc.dataUrl} download={f.docs.fitrepDoc.fileName} className="btn btn-outline btn-sm">📄 FITREP Document</a>
                  )}
                  {f.docs.routingSheet && (
                    <a href={f.docs.routingSheet.dataUrl} download={f.docs.routingSheet.fileName} className="btn btn-outline btn-sm">📄 Routing Sheet</a>
                  )}
                </div>
              )}
              <div className="stage-track">
                {f.stages.map((s, i) => {
                  const done     = i < f.currentStage;
                  const returned = i === f.currentStage && f.status === "Returned";
                  const active   = i === f.currentStage && !isDone;
                  return (
                    <div key={i} className={`stage-item ${done ? "done" : returned ? "returned" : active ? "active" : ""}`}>
                      <div className={`stage-dot ${done ? "done" : returned ? "returned" : active ? "active" : "pending"}`}>
                        {done ? "✓" : returned ? "↩" : s.icon}
                      </div>
                      <div className={`stage-label ${done ? "done" : returned ? "returned" : active ? "active" : ""}`}>{s.name}</div>
                      {active && canAct && <div className="stage-approver active">● You</div>}
                    </div>
                  );
                })}
              </div>

              {/* Completed stage comments */}
              {f.stages.some(s => s.completedBy && s.comment) && (
                <div style={{ marginTop:"0.75rem" }}>
                  <div style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.7rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#888", marginBottom:"0.5rem" }}>Stage Comments</div>
                  {f.stages.map((s, i) => s.completedBy && s.comment ? (
                    <div className="stage-comment" key={i}>
                      <div className="stage-comment-by">{s.name} · {s.completedBy} · {s.completedAt}</div>
                      {s.comment}
                    </div>
                  ) : null)}
                </div>
              )}

              {/* Action box for current approver */}
              {canAct && !isDone && (
                <div className="stage-action-box">
                  <div className="stage-action-label">⭐ Your Review — {currentStageName}</div>
                  {activeComment === f.id ? (
                    <>
                      <textarea
                        className="input"
                        style={{ minHeight:"80px", resize:"vertical", marginBottom:"0.65rem", fontSize:"0.85rem" }}
                        placeholder="Add your comments (optional — describe performance, concerns, or recommendations)…"
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                      />
                      <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                        <button className="btn btn-green btn-sm" onClick={() => advanceStage(f.id, "approved")}>
                          ✓ Approve & Advance
                        </button>
                        <button className="btn btn-red btn-sm" onClick={() => advanceStage(f.id, "returned")}>
                          ↩ Return to Originator
                        </button>
                        <button className="btn btn-outline btn-sm" onClick={() => { setActiveComment(null); setCommentText(""); }}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <button className="btn btn-orange btn-sm" onClick={() => { setActiveComment(f.id); setCommentText(""); }}>
                      ✏ Review & Add Comments
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Submit FITREP modal */}
      {showModal && (
        <Modal title="Submit FITREP" onClose={() => setShowModal(false)}>
          <div className="privacy-note">🔒 Private — only you and your CoC will see this.</div>
          {needsRouteSelect && (
            <>
              <div className="input-group">
                <label className="input-label">Your Company</label>
                <select className="input" value={submitForm.routeCompany} onChange={e => setSubmitForm(s => ({ ...s, routeCompany:e.target.value, routePlatoon:"" }))}>
                  <option value="">Select company…</option>
                  {["Alpha","Bravo","Charlie"].map(co => <option key={co} value={co}>{co}</option>)}
                </select>
              </div>
              {submitForm.routeCompany && (
                <div className="input-group">
                  <label className="input-label">Your Platoon</label>
                  <select className="input" value={submitForm.routePlatoon} onChange={e => setSubmitForm(s => ({ ...s, routePlatoon:e.target.value }))}>
                    <option value="">Select platoon…</option>
                    {getPlatoons(submitForm.routeCompany).map(p => <option key={p} value={p}>{formatPlatoonLabel(p)}</option>)}
                  </select>
                </div>
              )}
            </>
          )}
          <div className="input-group">
            <label className="input-label">Period</label>
            <select className="input" value={submitForm.period} onChange={e => setSubmitForm(s => ({ ...s, period:e.target.value }))}>
              <option>Spring 2026</option>
              <option>Fall 2025</option>
              <option>Spring 2025</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Notes (optional)</label>
            <textarea className="input" style={{ minHeight:"80px", resize:"vertical" }} value={submitForm.notes} onChange={e => setSubmitForm(s => ({ ...s, notes:e.target.value }))} />
          </div>

          {/* ── Required PDFs ── */}
          <div style={{ borderTop:"1px solid #eee", paddingTop:"0.85rem", marginTop:"0.25rem" }}>
            <div style={{ fontFamily:"'Barlow', 'Segoe UI', sans-serif", fontSize:"0.72rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#888", marginBottom:"0.65rem" }}>
              Required Documents
            </div>

            {/* FITREP Document */}
            <div className="input-group">
              <label className="input-label">
                FITREP Document <span style={{ color:"#C0392B" }}>*</span>
              </label>
              <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", flexWrap:"wrap" }}>
                <label htmlFor="fitrep-doc" className="btn btn-outline btn-sm" style={{ cursor:"pointer" }}>
                  {submitForm.fitrepDoc ? "↑ Replace PDF" : "↑ Upload PDF"}
                </label>
                <input
                  id="fitrep-doc" type="file" accept=".pdf,application/pdf"
                  style={{ display:"none" }}
                  onChange={e => { loadFitrepFile("fitrepDoc", e.target.files[0], ["application/pdf"], "⚠ Please select a PDF file."); e.target.value = ""; }}
                />
                {submitForm.fitrepDoc
                  ? <span style={{ fontSize:"0.78rem", color:"#2A7D4F", fontWeight:600 }}>📄 {submitForm.fitrepDoc.fileName}</span>
                  : <span style={{ fontSize:"0.75rem", color:"#C0392B" }}>Required</span>
                }
              </div>
            </div>

            {/* Routing Sheet */}
            <div className="input-group">
              <label className="input-label">
                Routing Sheet <span style={{ color:"#C0392B" }}>*</span>
              </label>
              <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", flexWrap:"wrap" }}>
                <label htmlFor="fitrep-routing-sheet" className="btn btn-outline btn-sm" style={{ cursor:"pointer" }}>
                  {submitForm.routingSheet ? "↑ Replace DOCX" : "↑ Upload DOCX"}
                </label>
                <input
                  id="fitrep-routing-sheet" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  style={{ display:"none" }}
                  onChange={e => { loadFitrepFile("routingSheet", e.target.files[0], ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"], "⚠ Please select a DOCX file."); e.target.value = ""; }}
                />
                {submitForm.routingSheet
                  ? <span style={{ fontSize:"0.78rem", color:"#2A7D4F", fontWeight:600 }}>📄 {submitForm.routingSheet.fileName}</span>
                  : <span style={{ fontSize:"0.75rem", color:"#C0392B" }}>Required</span>
                }
              </div>
            </div>
          </div>

          <div style={{ background:"#f5f2ee", borderRadius:"8px", padding:"0.65rem", fontSize:"0.8rem", color:"#666", marginBottom:"1rem" }}>
            Your FITREP routes to: <strong>{routeHint()}</strong>
          </div>
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"flex-end" }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-orange" onClick={handleSubmit}>Submit FITREP</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────
const NAV = [
  { id:"dashboard", label:"Dashboard",     icon:"🏠" },
  { id:"calendar",  label:"POTW",          icon:"📅" },
  { id:"structure", label:"BN Structure",  icon:"🖧" },
  { id:"training",  label:"PT & LL",       icon:"💪" },
  { id:"chits",     label:"CHITs",         icon:"📋" },
  { id:"fitreps",   label:"FITREPs",       icon:"📊" },
  { id:"roster",    label:"Recall Roster", icon:"📒" },
  { id:"forms",     label:"Forms",         icon:"📝" },
  { id:"academic",  label:"Academic Board",icon:"🎓" },
];

const MNAV = [
  { id:"dashboard", label:"Home",    icon:"🏠" },
  { id:"calendar",  label:"POTW",    icon:"📅" },
  { id:"chits",     label:"CHITs",   icon:"📋" },
  { id:"fitreps",   label:"FITREPs", icon:"📊" },
  { id:"roster",    label:"Roster",  icon:"📒" },
];

export default function App() {
  const cachedRoster = loadCachedRoster();
  const [user, setUser]           = useState(null);
  const [page, setPage]           = useState("dashboard");
  const [reminder, setReminder]   = useState({ enabled: false, text: "" });
  const [chits, setChits]         = useState(INIT_CHITS);
  const [fitrebs, setFitrebs]     = useState(INIT_FITREBS);
  const [showAccount, setShowAccount] = useState(false);
  // Forms: posted by billets/Big Four, clicks tracked per user id.
  const [forms, setForms]         = useState([]);
  // PT plan PDFs: one per session key (monday/wednesday/thursday). Null until OPS uploads.
  const [ptPlans, setPtPlans]     = useState({ monday:null, wednesday:null, thursday:null });
  // LL session list: TRAINO manages text notes; everyone reads.
  const [llSessions, setLlSessions] = useState(LEADLAB_INIT);
  // userList: populated from Google Sheet on mount; empty until fetch completes
  const [userList, setUserList]   = useState(cachedRoster);
  // sheetSynced: true only after the Sheets fetch resolves OR rejects (never while in-flight)
  const [sheetSynced, setSheetSynced] = useState(!SHEETS_API_URL || cachedRoster.length > 0);
  const [sheetError,  setSheetError]  = useState(false);

  const fetchRoster = (attempt = 0) => {
    if (!SHEETS_API_URL) { setSheetSynced(true); return; }
    if (attempt === 0) { setSheetSynced(false); setSheetError(false); }
    const url = `${SHEETS_API_URL}?token=${encodeURIComponent(SHEETS_API_TOKEN)}&_t=${Date.now()}`;
    fetch(url, { redirect: "follow" })
      .then(res => { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(data => {
        if (data.users && data.users.length > 0) {
          const nextUsers = data.users.map((row, i) => sheetRowToUser(row, i));
          setUserList(nextUsers);
          saveCachedRoster(nextUsers);
          setSheetSynced(true);
        } else {
          throw new Error("Empty roster");
        }
      })
      .catch(() => {
        if (attempt < 2) {
          setTimeout(() => fetchRoster(attempt + 1), 1500);
        } else {
          setSheetError(true);
          setSheetSynced(true);
        }
      });
  };

  // Fetch roster from private Google Sheet via Apps Script on mount
  useEffect(fetchRoster, []);

  const handleLogin = (loggedInUser) => {
    // Sync with live userList in case Sheets data was fetched
    const fresh = userList.find(u => u.id === loggedInUser.id) || loggedInUser;
    setUser(fresh);
  };

  const handlePasswordChange = (newPassword) => {
    setUser(prev => ({ ...prev, password: newPassword, mustChangePassword: false }));
    setUserList(prev => prev.map(u => u.id === user.id ? { ...u, password: newPassword, mustChangePassword: false } : u));
  };

  if (!user) {
    return (
      <>
        <style>{CSS}</style>
        <LoginPage onLogin={handleLogin} userList={userList} sheetSynced={sheetSynced} sheetError={sheetError} onRetry={fetchRoster} />
      </>
    );
  }

  // Force password reset on first login before showing anything else
  if (user.mustChangePassword) {
    return (
      <>
        <style>{CSS}</style>
        <FirstLoginGate onPasswordChange={handlePasswordChange} />
      </>
    );
  }

  const renderPage = () => {
    if (page === "dashboard")  return <Dashboard onNav={setPage} userList={userList} chits={chits} forms={forms} reminder={reminder} setReminder={setReminder} />;
    if (page === "calendar")   return <CalendarPage />;
    if (page === "structure")  return <StructurePage userList={userList} />;
    if (page === "training")   return <TrainingPage ptPlans={ptPlans} setPtPlans={setPtPlans} llSessions={llSessions} setLlSessions={setLlSessions} />;
    if (page === "chits")      return <ChitsPage chits={chits} setChits={setChits} userList={userList} />;
    if (page === "fitreps")    return <FitrepsPage fitrebs={fitrebs} setFitrebs={setFitrebs} userList={userList} />;
    if (page === "roster")     return <RosterPage userList={userList} />;
    if (page === "forms")      return <FormsPage forms={forms} setForms={setForms} />;
    if (page === "academic")   return <AcademicPage />;
    return <Dashboard onNav={setPage} />;
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <style>{CSS}</style>
      {showAccount && (
        <AccountModal
          onClose={() => setShowAccount(false)}
          onPasswordChange={handlePasswordChange}
        />
      )}
      <div>
        <header className="topbar">
          <div style={{ display:"flex", alignItems:"center" }}>
            <div className="topbar-logo">UT</div>
            <div className="topbar-title">The <span>Quarterdeck</span></div>
          </div>
          <div className="topbar-right">
            <div
              style={{ display:"flex", alignItems:"center", gap:"0.5rem", cursor:"pointer" }}
              onClick={() => setShowAccount(true)}
              title="Account Info"
            >
              <span className="rank-pill">{user.rank.split(" ")[0] || user.rank}</span>
              <span style={{ color:"#ccc", fontSize:"0.85rem" }}>{user.name.split(",")[0]}</span>
              {isCoC(user) && <span className="role-pill">{user.role.replace("_"," ")}</span>}
            </div>
            <button className="btn-logout" onClick={() => { setUser(null); setPage("dashboard"); }}>Sign Out</button>
          </div>
        </header>

        <div className="layout">
          <nav className="sidebar">
            <div className="sidebar-group">
              <div className="sidebar-label">Navigation</div>
              {NAV.map(item => (
                <button key={item.id} className={`nav-btn ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
                  <span className={item.id === "structure" ? "nav-structure-icon" : undefined}>{item.icon}</span> {item.label}
                </button>
              ))}
            </div>
            <div className="sidebar-footer">
              <strong style={{ color:"#9ab0c4", cursor:"pointer" }} onClick={() => setShowAccount(true)}>{user.name}</strong><br />
              {formatCompanyCoLabel(user.company)} · {user.platoon}<br />
              <span style={{ color:"#F7941D" }}>{user.role.replace("_"," ").toUpperCase()}</span>
            </div>
          </nav>

          <main className="content">
            {renderPage()}
          </main>
        </div>

        <nav className="mobile-nav">
          <div className="mobile-nav-inner">
            {MNAV.map(item => (
              <button key={item.id} className={`mobile-btn ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
                <span className="mobile-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </AuthContext.Provider>
  );
}
