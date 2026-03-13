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
    case "forms":     return ["co_cdr", "adj"].includes(user.role);
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
  if (!user || !chit?.stages || chit.status === "Approved" || chit.status === "Denied") return false;
  if (chit.currentStage >= chit.stages.length - 1) return false;
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
// mustChangePassword: true  → user must set a new password on first login
const USERS = [
  // BN STAFF
  { id:"u001", name:"Hinz",            rank:"MIDN 1/C", role:"bn_cdr",  company:"BN",         platoon:"BNCO",   password:"jh76769",  email:"bnco.utnrotc@gmail.com",       phone:"(408)460-8418", mustChangePassword:false },
  { id:"u002", name:"Townsend",        rank:"MIDN 1/C", role:"xo",      company:"BN",         platoon:"BNXO",   password:"jst2536",  email:"bnxo.utnrotc@gmail.com",       phone:"619-315-6406",  mustChangePassword:false },
  { id:"u003", name:"Galan",           rank:"MIDN 1/C", role:"ops",     company:"BN",         platoon:"OPS",    password:"GG29633",  email:"ops.utnrotc@gmail.com",        phone:"(830)734-1689", mustChangePassword:false },
  { id:"u004", name:"Zuniga",          rank:"GySgt",    role:"sel",     company:"BN",         platoon:"SEL",    password:"mz9846",   email:"mz9846@eid.utexas.edu",        phone:"817-729-6232",  mustChangePassword:false },
  { id:"u005", name:"Barela",          rank:"MIDN 2/C", role:"pto",     company:"BN",         platoon:"PTO",    password:"dab5836",  email:"ptoutnrotc@gmail.com",         phone:"(832)506-6377", mustChangePassword:false },
  { id:"u006", name:"Courtney, L.",    rank:"MIDN 2/C", role:"adj",     company:"BN",         platoon:"ADJ",    password:"lec3474",  email:"adj.utnrotc@gmail.com",        phone:"847-340-0995",  mustChangePassword:false },
  { id:"u007", name:"Evans",           rank:"MIDN 2/C", role:"mid",     company:"BN",         platoon:"SUPPO",  password:"ace2664",  email:"suppo.utnrotc@gmail.com",      phone:"425-505-7451",  mustChangePassword:false },
  { id:"u008", name:"Spooner, M.",     rank:"MIDN 3/C", role:"mid",     company:"BN",         platoon:"PAO",    password:"mfs2535",  email:"pao.utnrotc@gmail.com",        phone:"512-632-3258",  mustChangePassword:false },
  { id:"u009", name:"Doghri",          rank:"GySgt",    role:"traino",  company:"BN",         platoon:"TRAINO", password:"Sbd838",   email:"traino.utnrotc@gmail.com",     phone:"251-235-0552",  mustChangePassword:false },
  { id:"u010", name:"Hash",            rank:"OC",       role:"academics",company:"BN",        platoon:"AO",     password:"wgh543",   email:"academics.utnrotc@gmail.com",  phone:"512-738-6206",  mustChangePassword:false },
  { id:"u011", name:"Gu",              rank:"MIDN 2/C", role:"mid",     company:"BN",         platoon:"BGDO",   password:"jg78873",  email:"recruiting.utnrotc@gmail.com", phone:"832-490-5818",  mustChangePassword:false },
  { id:"u012", name:"Planchon",        rank:"MIDN 3/C", role:"mid",     company:"BN",         platoon:"AOPS",   password:"dmp3637",  email:"bnaops.utnrotc@gmail.com",     phone:"726-213-1790",  mustChangePassword:false },
  { id:"u013", name:"Treshock, J.",    rank:"MIDN 2/C", role:"mid",     company:"BN",         platoon:"CGC",    password:"jet3778",  email:"cgc.utnrotc@gmail.com",        phone:"732-759-7001",  mustChangePassword:false },
  // ALPHA CO
  { id:"u020", name:"McRae",           rank:"MIDN 1/C", role:"co_cdr",  company:"Alpha",      platoon:"CO",     password:"ecm3252",  email:"ellemcrae03@utexas.edu",       phone:"512-731-1057",  mustChangePassword:false },
  { id:"u021", name:"Shahbaz Butt",    rank:"SSgt",     role:"sel",     company:"Alpha",      platoon:"SEL",    password:"ssb3338",  email:"shahbaz.butt130@gmail.com",    phone:"346-278-4072",  mustChangePassword:false },
  { id:"u022", name:"Ramirez",         rank:"MIDN 3/C", role:"plt_cdr", company:"Alpha",      platoon:"1st PC", password:"kcr2267",  email:"keith.ramirez@utexas.edu",     phone:"(806)544-0729", mustChangePassword:false },
  { id:"u023", name:"Locklin",         rank:"MIDN 4/C", role:"mid",     company:"Alpha",      platoon:"1st PC", password:"tjl2677",  email:"theodorejlocklin@icloud.com",  phone:"575-997-5396",  mustChangePassword:false },
  { id:"u024", name:"Black",           rank:"MIDN 3/C", role:"mid",     company:"Alpha",      platoon:"1st PC", password:"etb638",   email:"evantblack05@utexas.edu",      phone:"817-994-3366",  mustChangePassword:false },
  { id:"u025", name:"Arevalo",         rank:"SSgt",     role:"nco",     company:"Alpha",      platoon:"1st PC", password:"Cla3383",  email:"Careval2@stedwards.edu",       phone:"(903)806-3670", mustChangePassword:false },
  { id:"u026", name:"McNutt",          rank:"MIDN 3/C", role:"mid",     company:"Alpha",      platoon:"1st PC", password:"ajm9265",  email:"nutmeg5786@gmail.com",         phone:"737-206-6849",  mustChangePassword:false },
  { id:"u027", name:"Hill",            rank:"Sgt",      role:"nco",     company:"Alpha",      platoon:"1st PC", password:"mjh5654",  email:"Montyhill14@gmail.com",        phone:"(260)517-9379", mustChangePassword:false },
  { id:"u028", name:"Cevalles",        rank:"SSgt",     role:"nco",     company:"Alpha",      platoon:"1st PC", password:"1346520",  email:"acevall1@stedwards.edu",       phone:"(210)996-5967", mustChangePassword:false },
  { id:"u029", name:"Marinescu",       rank:"MIDN 3/C", role:"mid",     company:"Alpha",      platoon:"1st PC", password:"mm226955", email:"mm226955@my.utexas.edu",       phone:"832-874-8461",  mustChangePassword:false },
  { id:"u030", name:"Edsonschuerfeld", rank:"SSgt",     role:"nco",     company:"Alpha",      platoon:"1st PC", password:"NZE63",    email:"edson.nathyn@gmail.com",       phone:"541-653-1135",  mustChangePassword:false },
  { id:"u031", name:"Hearn",           rank:"MIDN 2/C", role:"mid",     company:"Alpha",      platoon:"1st PC", password:"cmh6492",  email:"cody.hearn22@gmail.com",       phone:"562-386-7172",  mustChangePassword:false },
  { id:"u032", name:"Powell",          rank:"MIDN 2/C", role:"mid",     company:"Alpha",      platoon:"1st PC", password:"flp333",   email:"flp333@my.utexas.edu",         phone:"931-215-8160",  mustChangePassword:false },
  { id:"u033", name:"Lutz",            rank:"MIDN 1/C", role:"plt_cdr", company:"Alpha",      platoon:"2nd PC", password:"tel663",   email:"tyler.lutz@utexas.edu",        phone:"401-516-8455",  mustChangePassword:false },
  { id:"u034", name:"Felan",           rank:"SSgt",     role:"nco",     company:"Alpha",      platoon:"2nd PC", password:"175862",   email:"Tristianf17@gmail.com",        phone:"(210)887-3068", mustChangePassword:false },
  { id:"u035", name:"Padmanabhan",     rank:"MIDN 4/C", role:"mid",     company:"Alpha",      platoon:"2nd PC", password:"ap68366",  email:"ap68366@my.utexas.edu",        phone:"737-900-1113",  mustChangePassword:false },
  { id:"u036", name:"Garza",           rank:"SSgt",     role:"nco",     company:"Alpha",      platoon:"2nd PC", password:"180610",   email:"renemariogarzaiii@gmail.com",  phone:"830-295-0485",  mustChangePassword:false },
  { id:"u037", name:"Perez",           rank:"Sgt",      role:"nco",     company:"Alpha",      platoon:"2nd PC", password:"178295",   email:"Ethianperez@gmail.com",        phone:"(512)618-2720", mustChangePassword:false },
  { id:"u038", name:"McCleskey",       rank:"GySgt",    role:"nco",     company:"Alpha",      platoon:"2nd PC", password:"Cwm2938",  email:"Cwm2938@my.utexas.edu",        phone:"(806)677-6784", mustChangePassword:false },
  { id:"u039", name:"Hernandez Gomez", rank:"SSgt",     role:"nco",     company:"Alpha",      platoon:"2nd PC", password:"CH56244",  email:"CH56244@eid.utexas.edu",       phone:"678-830-8728",  mustChangePassword:false },
  // BRAVO CO
  { id:"u040", name:"Irisari",         rank:"MIDN 2/C", role:"co_cdr",  company:"Bravo", platoon:"CO",     password:"ai6959",   email:"airisari@outlook.com",         phone:"703-223-3625",  mustChangePassword:false },
  { id:"u041", name:"Francis",         rank:"OC",       role:"sel",     company:"Bravo", platoon:"SEL",    password:"cf29624",  email:"chas.francis01@gmail.com",     phone:"512-738-1074",  mustChangePassword:false },
  { id:"u042", name:"Alcazar",         rank:"MIDN 3/C", role:"plt_cdr", company:"Bravo", platoon:"1st PC", password:"laa3843",  email:"lukealcazar11@gmail.com",      phone:"210-400-3015",  mustChangePassword:false },
  { id:"u043", name:"Treshock, T.",    rank:"MIDN 2/C", role:"mid",     company:"Bravo", platoon:"1st PC", password:"jtt3891",  email:"jimmytreshock145@utexas.edu",  phone:"732-759-7001",  mustChangePassword:false },
  { id:"u044", name:"Madulara",        rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"1st PC", password:"cam23254", email:"cnmadulara@gmail.com",         phone:"281-658-2600",  mustChangePassword:false },
  { id:"u045", name:"Renslow",         rank:"MIDN 3/C", role:"mid",     company:"Bravo", platoon:"1st PC", password:"hgr5147",  email:"hgrenslow@gmail.com",          phone:"515-441-4144",  mustChangePassword:false },
  { id:"u046", name:"Brakefield",      rank:"MIDN 1/C", role:"mid",     company:"Bravo", platoon:"1st PC", password:"afb868",   email:"afb868@utexas.edu",            phone:"(210)237-2884", mustChangePassword:false },
  { id:"u047", name:"Rajesh",          rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"1st PC", password:"ar84238",  email:"arajesh@utexas.edu",           phone:"703-599-2498",  mustChangePassword:false },
  { id:"u048", name:"Rhodes",          rank:"MIDN 1/C", role:"mid",     company:"Bravo", platoon:"1st PC", password:"Mpr2348",  email:"Mpr2348@my.utexas.edu",        phone:"512-694-3039",  mustChangePassword:false },
  { id:"u049", name:"Diedrich",        rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"1st PC", password:"gd22345",  email:"glincolnd4@gmail.com",         phone:"630-234-4045",  mustChangePassword:false },
  { id:"u050", name:"Angeles",         rank:"MIDN 1/C", role:"mid",     company:"Bravo", platoon:"1st PC", password:"jma5962",  email:"jacobangeles@utexas.edu",      phone:"631-827-8716",  mustChangePassword:false },
  { id:"u051", name:"Harpuder, E.",    rank:"MIDN 1/C", role:"mid",     company:"Bravo", platoon:"1st PC", password:"ehh589",   email:"ehharpuder@utexas.edu",        phone:"808-364-7319",  mustChangePassword:false },
  { id:"u052", name:"Kessler",         rank:"OC",       role:"oc",      company:"Bravo", platoon:"1st PC", password:"jnk788",   email:"jnk788@my.utexas.edu",         phone:"940-727-8105",  mustChangePassword:false },
  { id:"u053", name:"Myers",           rank:"OC",       role:"oc",      company:"Bravo", platoon:"1st PC", password:"cm68236",  email:"cannonm1023@gmail.com",        phone:"717-585-1996",  mustChangePassword:false },
  { id:"u054", name:"Redington",       rank:"MIDN 3/C", role:"plt_cdr", company:"Bravo", platoon:"2nd PC", password:"kjr2897",  email:"kjredington24@gmail.com",      phone:"917-561-3818",  mustChangePassword:false },
  { id:"u055", name:"Bertrand",        rank:"MIDN 2/C", role:"mid",     company:"Bravo", platoon:"2nd PC", password:"jb79929",  email:"jb79929@my.utexas.edu",        phone:"(516)305-0975", mustChangePassword:false },
  { id:"u056", name:"Morales",         rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"2nd PC", password:"jm227556", email:"jm227556@eid.utexas.edu",      phone:"3617931889",    mustChangePassword:false },
  { id:"u057", name:"Murray",          rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"2nd PC", password:"egm2753",  email:"egrace1211@gmail.com",         phone:"903-436-3601",  mustChangePassword:false },
  { id:"u058", name:"Opiela",          rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"2nd PC", password:"neo392",   email:"natalie@opiela.org",           phone:"512-915-9446",  mustChangePassword:false },
  { id:"u059", name:"Reis",            rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"2nd PC", password:"dpr853",   email:"reisdeborah90@gmail.com",      phone:"512-992-5880",  mustChangePassword:false },
  { id:"u060", name:"Straub",          rank:"MIDN 1/C", role:"mid",     company:"Bravo", platoon:"2nd PC", password:"ncs2239",  email:"nstraub@utexas.edu",           phone:"(281)520-5259", mustChangePassword:false },
  { id:"u061", name:"Edwards",         rank:"MIDN 2/C", role:"mid",     company:"Bravo", platoon:"2nd PC", password:"cae2726",  email:"cedwards49@icloud.com",        phone:"805-320-0311",  mustChangePassword:false },
  { id:"u062", name:"Nicholas",        rank:"MIDN 1/C", role:"mid",     company:"Bravo", platoon:"2nd PC", password:"han494",   email:"hannicholas@utexas.edu",       phone:"832-298-1395",  mustChangePassword:false },
  { id:"u063", name:"Quidlat",         rank:"MIDN 2/C", role:"mid",     company:"Bravo", platoon:"2nd PC", password:"mqq57",    email:"mjqquidlat@utexas.edu",        phone:"512-662-2622",  mustChangePassword:false },
  { id:"u064", name:"Nugent",          rank:"OC",       role:"oc",      company:"Bravo", platoon:"2nd PC", password:"nn9389",   email:"nugent.nicolas1@gmail.com",    phone:"717-425-4675",  mustChangePassword:false },
  { id:"u065", name:"Lee",             rank:"MIDN 3/C", role:"plt_cdr", company:"Bravo", platoon:"3rd PC", password:"dl38724",  email:"daniellee@utexas.edu",         phone:"213-800-2182",  mustChangePassword:false },
  { id:"u066", name:"Hash, W.",        rank:"OC",       role:"oc",      company:"Bravo", platoon:"3rd PC", password:"wgh543",   email:"weston.hash@utexas.edu",       phone:"512-738-6206",  mustChangePassword:false },
  { id:"u067", name:"Jiwa",            rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"3rd PC", password:"zcj232",   email:"zcj232@eid.utexas.edu",        phone:"512-496-4193",  mustChangePassword:false },
  { id:"u068", name:"Ost",             rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"3rd PC", password:"jco2524",  email:"jco2524@my.utexas.edu",        phone:"412-304-6961",  mustChangePassword:false },
  { id:"u069", name:"Lopez",           rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"3rd PC", password:"ml56697",  email:"marquezl2024@gmail.com",       phone:"830-968-7842",  mustChangePassword:false },
  { id:"u070", name:"Handford",        rank:"MIDN 1/C", role:"mid",     company:"Bravo", platoon:"3rd PC", password:"wbh725",   email:"wheeler.betz@utexas.edu",      phone:"904-485-3224",  mustChangePassword:false },
  { id:"u071", name:"Courtney, L.",    rank:"MIDN 2/C", role:"mid",     company:"Bravo", platoon:"3rd PC", password:"lec3474",  email:"laurencourtney@utexas.edu",    phone:"847-340-0995",  mustChangePassword:false },
  { id:"u072", name:"Born",            rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"3rd PC", password:"zpb265",   email:"Zborn73@gmail.com",            phone:"202-807-8663",  mustChangePassword:false },
  { id:"u073", name:"Tuin",            rank:"MIDN 4/C", role:"mid",     company:"Bravo", platoon:"3rd PC", password:"vet368",   email:"vet368@eid.utexas.edu",        phone:"682-220-5723",  mustChangePassword:false },
  { id:"u074", name:"Evans, X.",       rank:"MIDN 2/C", role:"mid",     company:"Bravo", platoon:"3rd PC", password:"xae4821",  email:"xander_evans@icloud.com",      phone:"425-505-7451",  mustChangePassword:false },
  { id:"u075", name:"Sacco",           rank:"OC",       role:"oc",      company:"Bravo", platoon:"3rd PC", password:"aps3622",  email:"alec.sacco.1@gmail.com",       phone:"469-321-1666",  mustChangePassword:false },
  // CHARLIE CO
  { id:"u080", name:"Torres",          rank:"MIDN 2/C", role:"co_cdr",  company:"Charlie", platoon:"CO",     password:"dat2999",  email:"dannytorres569@utexas.edu",    phone:"915-216-1651",  mustChangePassword:false },
  { id:"u081", name:"Wende",           rank:"OC",       role:"sel",     company:"Charlie", platoon:"SEL",    password:"drw3295",  email:"darrenrwende@gmail.com",       phone:"346-773-8825",  mustChangePassword:false },
  { id:"u082", name:"Burrell",         rank:"MIDN 3/C", role:"plt_cdr", company:"Charlie", platoon:"1st PC", password:"blb4644",  email:"byronburrell1@gmail.com",      phone:"469-500-0452",  mustChangePassword:false },
  { id:"u083", name:"Crimmins",        rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"1st PC", password:"tjc3735",  email:"tjcrimmins@icloud.com",        phone:"301-741-1281",  mustChangePassword:false },
  { id:"u084", name:"Lucas",           rank:"MIDN 1/C", role:"mid",     company:"Charlie", platoon:"1st PC", password:"mjl4272",  email:"lucashorns@utexas.edu",        phone:"512-590-9814",  mustChangePassword:false },
  { id:"u085", name:"Bell",            rank:"OC",       role:"oc",      company:"Charlie", platoon:"1st PC", password:"ab79952",  email:"alexkrisbell@utexas.edu",      phone:"720-839-7106",  mustChangePassword:false },
  { id:"u086", name:"Savage",          rank:"OC",       role:"oc",      company:"Charlie", platoon:"1st PC", password:"ccs3944",  email:"ccsavage04@gmail.com",         phone:"(214)966-2119", mustChangePassword:false },
  { id:"u087", name:"Paz",             rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"1st PC", password:"seu_paz",  email:"dpaz2@stedwards.edu",          phone:"956-245-9429",  mustChangePassword:false },
  { id:"u088", name:"Carrizales",      rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"1st PC", password:"ac95845",  email:"alexcarrizales43@gmail.com",   phone:"512-672-9814",  mustChangePassword:false },
  { id:"u089", name:"Downey",          rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"1st PC", password:"lsd793",   email:"logan.sage@gmail.com",         phone:"321-626-4234",  mustChangePassword:false },
  { id:"u090", name:"Spooner, M.",     rank:"MIDN 3/C", role:"mid",     company:"Charlie", platoon:"1st PC", password:"msp6341",  email:"mspooner@utexas.edu",          phone:"512-632-3258",  mustChangePassword:false },
  { id:"u091", name:"Barto",           rank:"MIDN 3/C", role:"mid",     company:"Charlie", platoon:"1st PC", password:"ekb2234",  email:"theevelyn@utexas.edu",         phone:"214-578-4716",  mustChangePassword:false },
  { id:"u092", name:"Thai",            rank:"OC",       role:"oc",      company:"Charlie", platoon:"1st PC", password:"jbt2399",  email:"jonathanbthai@utexas.edu",     phone:"(916)257-1880", mustChangePassword:false },
  { id:"u093", name:"Delgado",         rank:"MIDN 3/C", role:"plt_cdr", company:"Charlie", platoon:"2nd PC", password:"cd38394",  email:"carolinadelgado@utexas.edu",   phone:"832-646-3786",  mustChangePassword:false },
  { id:"u094", name:"Jennings",        rank:"MIDN 2/C", role:"mid",     company:"Charlie", platoon:"2nd PC", password:"saj3222",  email:"saj3222@my.utexas.edu",        phone:"3392141051",    mustChangePassword:false },
  { id:"u095", name:"Roque-Garcia",    rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"2nd PC", password:"ncr839",   email:"natalie.groque0327@gmail.com", phone:"469-460-0237",  mustChangePassword:false },
  { id:"u096", name:"Mireles",         rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"2nd PC", password:"nvm389",   email:"nvm389@eid.utexas.edu",        phone:"956-203-7485",  mustChangePassword:false },
  { id:"u097", name:"Cremer",          rank:"MIDN 2/C", role:"mid",     company:"Charlie", platoon:"2nd PC", password:"jrc7734",  email:"joshuacremer@utexas.edu",      phone:"832-226-2604",  mustChangePassword:false },
  { id:"u098", name:"Aquino",          rank:"OC",       role:"oc",      company:"Charlie", platoon:"2nd PC", password:"ama8943",  email:"alexmaquino@yahoo.com",        phone:"714-869-5988",  mustChangePassword:false },
  { id:"u099", name:"Harpuder, S.",    rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"2nd PC", password:"sth2339",  email:"sharpuder@gmail.com",          phone:"808-375-5682",  mustChangePassword:false },
  { id:"u100", name:"Barela, D.",      rank:"MIDN 2/C", role:"mid",     company:"Charlie", platoon:"2nd PC", password:"dbd7291",  email:"dylan.barela@utexas.edu",      phone:"(832)506-6377", mustChangePassword:false },
  { id:"u101", name:"Fernandez",       rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"2nd PC", password:"df25644",  email:"df25644@my.utexas.edu",        phone:"830-344-9014",  mustChangePassword:false },
  { id:"u102", name:"Petteway",        rank:"MIDN 3/C", role:"mid",     company:"Charlie", platoon:"2nd PC", password:"eep982",   email:"epetteway15@gmail.com",        phone:"469-978-2712",  mustChangePassword:false },
  { id:"u103", name:"Carnicle",        rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"2nd PC", password:"arc6339",  email:"abigail.carnicle07@gmail.com", phone:"9799009635",    mustChangePassword:false },
  { id:"u104", name:"Simpson",         rank:"MIDN 3/C", role:"plt_cdr", company:"Charlie", platoon:"3rd PC", password:"tws2236",  email:"Thomas.simpson@utexas.edu",    phone:"210-330-1509",  mustChangePassword:false },
  { id:"u105", name:"Gu, A.",          rank:"MIDN 2/C", role:"mid",     company:"Charlie", platoon:"3rd PC", password:"jga9124",  email:"alexgujiaming@gmail.com",      phone:"832-490-5818",  mustChangePassword:false },
  { id:"u106", name:"Visintine",       rank:"MIDN 3/C", role:"mid",     company:"Charlie", platoon:"3rd PC", password:"slv843",   email:"luke.visintine@gmail.com",     phone:"832-507-5542",  mustChangePassword:false },
  { id:"u107", name:"Escamilla",       rank:"OC",       role:"oc",      company:"Charlie", platoon:"3rd PC", password:"ame3747",  email:"andrewescamilla411@gmail.com", phone:"951-751-6259",  mustChangePassword:false },
  { id:"u108", name:"Bailey",          rank:"MIDN 1/C", role:"mid",     company:"Charlie", platoon:"3rd PC", password:"msb4354",  email:"msbailey9@utexas.edu",         phone:"(206)351-8072", mustChangePassword:false },
  { id:"u109", name:"Planchon, D.",    rank:"MIDN 3/C", role:"mid",     company:"Charlie", platoon:"3rd PC", password:"dpd8823",  email:"dmedved@utexas.edu",           phone:"726-213-1790",  mustChangePassword:false },
  { id:"u110", name:"Braun",           rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"3rd PC", password:"dcb3454",  email:"doritlm.gamer@gmail.com",      phone:"737-412-2696",  mustChangePassword:false },
  { id:"u111", name:"Farrell",         rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"3rd PC", password:"jpf2493",  email:"j.patrick.farrell@gmail.com",  phone:"228-233-0620",  mustChangePassword:false },
  { id:"u112", name:"Alonzo",          rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"3rd PC", password:"mma4546",  email:"madelynn.alonzo@gmail.com",    phone:"903-271-1289",  mustChangePassword:false },
  { id:"u113", name:"Nolan",           rank:"MIDN 2/C", role:"mid",     company:"Charlie", platoon:"3rd PC", password:"rgn334",   email:"rubynolan@utexas.edu",         phone:"631-662-8783",  mustChangePassword:false },
  { id:"u114", name:"Eng",             rank:"MIDN 4/C", role:"mid",     company:"Charlie", platoon:"3rd PC", password:"be6627",   email:"brandoneng256@gmail.com",      phone:"936-330-5814",  mustChangePassword:false },
];

// ─── STATIC DATA ────────────────────────────────────────────
const POTW = {
  week: "Week 10 — Spring 2026",
  range: "23MAR26 - 27MAR26",
  operations: [
    { date:"23 MAR", title:"Battalion PT", time:"0700–0800", type:"PT", location:"Caven Lacrosse and Sports Center at Clark Field" },
    { date:"23 MAR", title:"Digital FITREPs due to PCs", time:"1500–1600", type:"Admin", location:"" },
    { date:"24 MAR", title:"PNS Inspection", time:"0700–0800", type:"Inspection", location:"" },
    { date:"24 MAR", title:"Company LL", time:"0800–0900", type:"Leadership", location:"ADM McRaven Classroom" },
    { date:"24 MAR", title:"Calculus/Physics Tutoring", time:"1900–2000", type:"Academic", location:"ADM McRaven Classroom" },
    { date:"25 MAR", title:"Alpha Company PT", time:"0530–0630", type:"PT", location:"Lady Bird Lake Trail" },
    { date:"25 MAR", title:"Bravo/Charlie Company PT", time:"0700–0800", type:"PT", location:"Caven Lacrosse and Sports Center at Clark Field" },
    { date:"26 MAR", title:"FEP", time:"0700–0800", type:"PT", location:"Caven Lacrosse and Sports Center at Clark Field" },
    { date:"26 MAR", title:"BN Staff Meeting", time:"1530–1630", type:"Staff", location:"BN Staff Office" },
    { date:"26-29 MAR", title:"Yale Leadership Conference", time:"All Day", type:"Conference", location:"" },
    { date:"27 MAR", title:"Drill", time:"0700–0800", type:"Drill", location:"Caven Lacrosse and Sports Center at Clark Field" },
    { date:"27 MAR", title:"Unit Sync Meeting", time:"1000–1100", type:"Staff", location:"Conference Room" },
  ],
};

const BN = [
  { name:"Alpha Company", co:"MIDN 1/C McRae", xo:"SSgt Shahbaz Butt (SEL)", color:COMPANY_COLORS.Alpha,
    platoons:[
      { name:"1st PLT", plt:"MIDN 3/C Ramirez", mids: USERS.filter(u=>normalizeCompany(u.company)==="Alpha"&&u.platoon==="1st PC").length },
      { name:"2nd PLT", plt:"MIDN 1/C Lutz",    mids: USERS.filter(u=>normalizeCompany(u.company)==="Alpha"&&u.platoon==="2nd PC").length },
    ]},
  { name:"Bravo Company", co:"MIDN 2/C Irisari", xo:"OC Francis (SEL)", color:COMPANY_COLORS.Bravo,
    platoons:[
      { name:"1st PLT", plt:"MIDN 3/C Alcazar",   psg:"OC Kessler",  mids: USERS.filter(u=>u.company==="Bravo"&&u.platoon==="1st PC").length },
      { name:"2nd PLT", plt:"MIDN 3/C Redington",  psg:"OC Nugent",   mids: USERS.filter(u=>u.company==="Bravo"&&u.platoon==="2nd PC").length },
      { name:"3rd PLT", plt:"MIDN 3/C Lee",        psg:"OC Hash, W.", mids: USERS.filter(u=>u.company==="Bravo"&&u.platoon==="3rd PC").length },
    ]},
  { name:"Charlie Company", co:"MIDN 2/C Torres", xo:"OC Wende (SEL)", color:COMPANY_COLORS.Charlie,
    platoons:[
      { name:"1st PLT", plt:"MIDN 3/C Burrell",  psg:"OC Bell",      mids: USERS.filter(u=>u.company==="Charlie"&&u.platoon==="1st PC").length },
      { name:"2nd PLT", plt:"MIDN 3/C Delgado",  psg:"OC Aquino",    mids: USERS.filter(u=>u.company==="Charlie"&&u.platoon==="2nd PC").length },
      { name:"3rd PLT", plt:"MIDN 3/C Simpson",  psg:"OC Escamilla", mids: USERS.filter(u=>u.company==="Charlie"&&u.platoon==="3rd PC").length },
    ]},
];

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

const LEADLAB = [
  { title:"Land Navigation", date:"Mar 12",
    objectives:["Identify terrain features on a map","Plot an 8-digit grid coordinate","Navigate 3 points in under 90 min"],
    notes:"Bring protractor, compass, pencil. MGRS map issued at 1345." },
  { title:"React to Contact", date:"Mar 26",
    objectives:["Identify threat direction","Issue a SALUTE report","Execute squad battle drill"],
    notes:"ACU/camouflage required. No live ammo." },
  { title:"Leadership Reaction Course", date:"Apr 9",
    objectives:["Complete obstacle with assigned team","Issue and receive clear OPORD","Debrief AAR"],
    notes:"Teams assigned day prior." },
];

const INIT_CHITS = [
  (() => {
    const submitter = USERS.find(u => u.id === "u023");
    const chain = buildChitApprovalChain(USERS, submitter, { company:"Alpha", platoon:"1st PC" });
    const stages = buildChitStages(submitter.name, "2026-03-10", chain);
    return {
      id:"CHT-001",
      userId:submitter.id,
      name:submitter.name,
      company:"Alpha",
      platoon:"1st PC",
      date:"2026-03-14",
      reason:"Medical Appointment",
      notes:"",
      status:"Pending",
      route: chain.map(node => node.label),
      currentStage:1,
      deniedAtStage:null,
      stages,
      attachmentName:"",
      attachmentUrl:"",
    };
  })(),
  (() => {
    const submitter = USERS.find(u => u.id === "u055");
    const chain = buildChitApprovalChain(USERS, submitter, { company:"Bravo", platoon:"2nd PC" });
    const stages = buildChitStages(submitter.name, "2026-03-11", chain);
    stages[1] = { ...stages[1], completedBy:"Redington", completedAt:"2026-03-11", comment:"Approved at platoon level. No conflicts with required training." };
    stages[2] = { ...stages[2], completedBy:"Irisari", completedAt:"2026-03-12", comment:"Concur. Family emergency verified with company leadership." };
    stages[3] = { ...stages[3], completedBy:"Courtney, L.", completedAt:"2026-03-12", comment:"Administrative review complete. Forwarding to battalion." };
    stages[4] = { ...stages[4], completedBy:"Townsend", completedAt:"2026-03-13", comment:"Recommend approval." };
    stages[5] = { ...stages[5], completedBy:"Hinz", completedAt:"2026-03-13", comment:"Approved. Ensure makeup requirements are coordinated on return." };
    return {
      id:"CHT-002",
      userId:submitter.id,
      name:submitter.name,
      company:"Bravo",
      platoon:"2nd PC",
      date:"2026-03-15",
      reason:"Family Emergency",
      notes:"",
      status:"Approved",
      route: chain.map(node => node.label),
      currentStage: stages.length - 1,
      deniedAtStage:null,
      stages,
      attachmentName:"",
      attachmentUrl:"",
    };
  })(),
  (() => {
    const submitter = USERS.find(u => u.id === "u083");
    const chain = buildChitApprovalChain(USERS, submitter, { company:"Charlie", platoon:"1st PC" });
    const stages = buildChitStages(submitter.name, "2026-03-12", chain);
    stages[1] = { ...stages[1], completedBy:"Burrell", completedAt:"2026-03-12", comment:"Exam conflict confirmed. Recommend company review." };
    return {
      id:"CHT-003",
      userId:submitter.id,
      name:submitter.name,
      company:"Charlie",
      platoon:"1st PC",
      date:"2026-03-19",
      reason:"Academic Conflict — Exam",
      notes:"",
      status:"Pending",
      route: chain.map(node => node.label),
      currentStage:2,
      deniedAtStage:null,
      stages,
      attachmentName:"",
      attachmentUrl:"",
    };
  })(),
];

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

const FORMS = [
  { id:1, title:"Spring Ball RSVP",               deadline:"Mar 15", responses:34, total:82, status:"Open",   type:"Event" },
  { id:2, title:"ACFT Readiness Self-Assessment",  deadline:"Mar 18", responses:61, total:82, status:"Open",   type:"PT" },
  { id:3, title:"Leadership Lab AAR",              deadline:"Mar 12", responses:82, total:82, status:"Closed", type:"Training" },
  { id:4, title:"Uniform Accountability Survey",   deadline:"Mar 20", responses:12, total:82, status:"Open",   type:"Admin" },
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
const SHEETS_API_URL   = "https://script.google.com/macros/s/AKfycbxRgepNbdZ1PKYO43MCehQ-2tRiIJ5p_imisTwjSFd7p-yfl6SWfIReFx5BEghObD6Maw/exec";
const SHEETS_API_TOKEN = "UT_NROTC";
const SHEET_ONLY_MODE  = true;

// Sheet columns A→J: company, name, class, email, phone number, major, campus, eid, password, billet
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
    ? `${platoonMatch[1]} PC`
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
// Pipeline: Submitted → PC Review → Co CDR Review → BNXO Review → BNCO Approval → Complete
const FITREP_STAGES = [
  { name:"Submitted",      approverRole:null,      icon:"📝" },
  { name:"PC Review",      approverRole:"plt_cdr",  icon:"👤" },
  { name:"Co CDR Review",  approverRole:"co_cdr",   icon:"⭐" },
  { name:"BNXO Review",    approverRole:"xo",       icon:"🎖" },
  { name:"BNCO Approval",  approverRole:"bn_cdr",   icon:"✅" },
  { name:"Complete",       approverRole:null,       icon:"🏅" },
];

// Returns true if `user` is the designated approver for the fitrep's current stage
function canActOnFitrep(user, fitrep) {
  if (!user || fitrep.currentStage >= FITREP_STAGES.length - 1) return false;
  const stage = FITREP_STAGES[fitrep.currentStage];
  if (!stage.approverRole) return false;
  if (stage.approverRole === "plt_cdr")
    return user.role === "plt_cdr" &&
      normalizeCompany(user.company) === normalizeCompany(fitrep.company) &&
      normalizePlatoon(user.platoon) === normalizePlatoon(fitrep.platoon);
  if (stage.approverRole === "co_cdr")
    return user.role === "co_cdr" && normalizeCompany(user.company) === normalizeCompany(fitrep.company);
  return user.role === stage.approverRole;
}

function canViewFitrep(user, fitrep) {
  if (!user || !fitrep) return false;
  if (matchesUserIdentity(user, { id: fitrep.subjectId, name: fitrep.subjectName })) return true;
  if (user.role === "bn_cdr" || user.role === "xo") return true;
  if (user.role === "co_cdr") {
    return normalizeCompany(user.company) === normalizeCompany(fitrep.company);
  }
  if (user.role === "plt_cdr") {
    return normalizeCompany(user.company) === normalizeCompany(fitrep.company) &&
      normalizePlatoon(user.platoon) === normalizePlatoon(fitrep.platoon);
  }
  return false;
}

const INIT_FITREBS = [
  {
    id:"FIT-001", subjectId:"u023", subjectName:"Locklin", subjectRank:"MIDN 4/C",
    company:"Alpha", platoon:"1st PC", period:"Spring 2026", currentStage:1,
    stages:[
      { name:"Submitted",     completedBy:"Locklin",  completedAt:"2026-03-01", comment:"" },
      { name:"PC Review",     completedBy:null,       completedAt:null,         comment:"" },
      { name:"Co CDR Review", completedBy:null,       completedAt:null,         comment:"" },
      { name:"BNXO Review",   completedBy:null,       completedAt:null,         comment:"" },
      { name:"BNCO Approval", completedBy:null,       completedAt:null,         comment:"" },
    ],
  },
  {
    id:"FIT-002", subjectId:"u044", subjectName:"Madulara", subjectRank:"MIDN 4/C",
    company:"Bravo", platoon:"1st PC", period:"Spring 2026", currentStage:2,
    stages:[
      { name:"Submitted",     completedBy:"Madulara",  completedAt:"2026-03-02", comment:"" },
      { name:"PC Review",     completedBy:"Alcazar",   completedAt:"2026-03-05", comment:"Strong performer. Shows initiative in platoon activities." },
      { name:"Co CDR Review", completedBy:null,        completedAt:null,         comment:"" },
      { name:"BNXO Review",   completedBy:null,        completedAt:null,         comment:"" },
      { name:"BNCO Approval", completedBy:null,        completedAt:null,         comment:"" },
    ],
  },
  {
    id:"FIT-003", subjectId:"u083", subjectName:"Crimmins", subjectRank:"MIDN 4/C",
    company:"Charlie", platoon:"1st PC", period:"Spring 2026", currentStage:3,
    stages:[
      { name:"Submitted",     completedBy:"Crimmins",  completedAt:"2026-03-01", comment:"" },
      { name:"PC Review",     completedBy:"Burrell",   completedAt:"2026-03-04", comment:"Excellent leadership potential. Consistently performs above expectations." },
      { name:"Co CDR Review", completedBy:"Torres",    completedAt:"2026-03-07", comment:"Concur with PC assessment. Recommend early promotion consideration." },
      { name:"BNXO Review",   completedBy:null,        completedAt:null,         comment:"" },
      { name:"BNCO Approval", completedBy:null,        completedAt:null,         comment:"" },
    ],
  },
];

// ─── STYLES ─────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Source+Sans+3:wght@400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Source Sans 3', sans-serif; background: #FFF8F0; color: #1A1209; }

  .topbar { background: #1A1209; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 1.25rem; height: 58px; border-bottom: 3px solid #BF5700; position: sticky; top: 0; z-index: 50; }
  .topbar-logo { width: 36px; height: 36px; background: #BF5700; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: Oswald; font-weight: 700; font-size: 1rem; color: white; margin-right: 0.6rem; }
  .topbar-title { font-family: Oswald; font-weight: 700; font-size: 1.15rem; letter-spacing: 2px; text-transform: uppercase; }
  .topbar-title span { color: #F7941D; }
  .topbar-right { display: flex; align-items: center; gap: 0.75rem; }
  .rank-pill { background: #BF5700; color: white; padding: 2px 8px; border-radius: 4px; font-family: Oswald; font-size: 0.72rem; letter-spacing: 1px; text-transform: uppercase; }
  .role-pill { background: rgba(255,255,255,0.12); color: #ccc; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; text-transform: uppercase; }
  .btn-logout { background: transparent; border: 1.5px solid rgba(255,255,255,0.25); color: #ccc; border-radius: 4px; padding: 3px 10px; font-size: 0.75rem; cursor: pointer; font-family: Oswald; letter-spacing: 1px; text-transform: uppercase; }
  .btn-logout:hover { background: rgba(255,255,255,0.1); }

  .layout { display: flex; min-height: calc(100vh - 58px); }
  .sidebar { width: 210px; background: #0D1B2A; flex-shrink: 0; position: sticky; top: 58px; height: calc(100vh - 58px); overflow-y: auto; display: flex; flex-direction: column; }
  .sidebar-group { padding: 1rem 0 0.5rem; }
  .sidebar-label { font-family: Oswald; font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase; color: #7a8fa0; padding: 0 1rem; margin-bottom: 0.5rem; }
  .nav-btn { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; cursor: pointer; color: #9ab0c4; font-size: 0.88rem; border-left: 3px solid transparent; transition: all 0.15s; background: none; border-top: none; border-right: none; border-bottom: none; width: 100%; text-align: left; }
  .nav-btn:hover { background: rgba(255,255,255,0.05); color: white; }
  .nav-btn.active { background: rgba(191,87,0,0.2); color: #F7941D; border-left-color: #BF5700; font-weight: 600; }
  .sidebar-footer { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.08); margin-top: auto; font-size: 0.75rem; color: #6b7e90; line-height: 1.6; }

  .content { flex: 1; padding: 1.5rem; overflow-y: auto; min-width: 0; }

  .page-title { font-family: Oswald; font-size: 1.7rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.2rem; }
  .page-title span { color: #BF5700; }
  .page-sub { font-size: 0.88rem; color: #6B6B6B; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 2px solid rgba(191,87,0,0.15); }

  .card { background: white; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid rgba(191,87,0,0.1); margin-bottom: 1rem; }
  .card-title { font-family: Oswald; font-size: 0.9rem; letter-spacing: 1.5px; text-transform: uppercase; color: #1A1209; }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }

  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }

  .stat { background: white; border-radius: 10px; padding: 1rem 1.2rem; border-left: 4px solid #BF5700; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
  .stat-n { font-family: Oswald; font-size: 2rem; font-weight: 700; color: #BF5700; line-height: 1; }
  .stat-l { font-size: 0.78rem; color: #6B6B6B; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.2rem; }

  .btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; border-radius: 6px; font-family: Oswald; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border: none; font-weight: 500; transition: all 0.15s; }
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

  .input { width: 100%; padding: 0.5rem 0.75rem; border: 1.5px solid #ddd; border-radius: 6px; font-family: 'Source Sans 3', sans-serif; font-size: 0.9rem; color: #1A1209; background: white; }
  .input:focus { outline: none; border-color: #BF5700; }
  .input-group { margin-bottom: 0.9rem; }
  .input-label { display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #6B6B6B; margin-bottom: 0.3rem; }

  .alert { background: rgba(191,87,0,0.08); border: 1.5px solid #BF5700; border-radius: 8px; padding: 0.65rem 1rem; font-size: 0.85rem; color: #8B3D00; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
  .alert-green { background: rgba(42,125,79,0.1); border-color: #2A7D4F; color: #2A7D4F; }
  .privacy-note { background: rgba(13,27,42,0.05); border: 1.5px solid rgba(13,27,42,0.15); border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.82rem; color: #0D1B2A; margin-bottom: 1rem; }

  .potw-card { background: linear-gradient(135deg, #1A1209 0%, #0D1B2A 100%); color: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; }
  .potw-week { font-family: Oswald; font-size: 0.68rem; letter-spacing: 3px; text-transform: uppercase; color: #F7941D; margin-bottom: 0.4rem; }
  .potw-title { font-family: Oswald; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.6rem; }
  .potw-body { font-size: 0.88rem; line-height: 1.6; color: #CCC; margin-bottom: 0.75rem; }

  .event-row { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.7rem 0; border-bottom: 1px solid #f0ede8; }
  .event-date { min-width: 46px; text-align: center; background: #BF5700; color: white; border-radius: 7px; padding: 3px; }
  .event-day { font-family: Oswald; font-size: 1.35rem; font-weight: 700; line-height: 1; }
  .event-mo  { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 1px; }
  .event-title { font-weight: 600; font-size: 0.88rem; }
  .event-sub   { font-size: 0.78rem; color: #6B6B6B; }

  .company-block { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 1rem; }
  .company-header { color: white; padding: 0.8rem 1.2rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
  .company-name { font-family: Oswald; font-size: 1.05rem; letter-spacing: 2px; text-transform: uppercase; }
  .company-co { font-size: 0.78rem; color: rgba(255,255,255,0.75); }
  .platoon-grid { padding: 1rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 0.75rem; }
  .platoon-card { border: 1.5px solid rgba(191,87,0,0.2); border-radius: 8px; padding: 0.75rem; }
  .platoon-name { font-family: Oswald; font-size: 0.82rem; letter-spacing: 1.5px; color: #BF5700; margin-bottom: 0.35rem; }
  .platoon-detail { font-size: 0.78rem; color: #6B6B6B; }

  .pt-block { background: white; border-radius: 8px; overflow: hidden; margin-bottom: 0.75rem; border: 1px solid #eee; }
  .pt-header { background: #BF5700; color: white; padding: 0.55rem 1rem; display: flex; align-items: center; justify-content: space-between; font-family: Oswald; font-size: 0.9rem; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; }
  .pt-row { display: flex; align-items: center; gap: 1rem; padding: 0.4rem 1rem; border-bottom: 1px solid #faf7f4; font-size: 0.85rem; }
  .pt-name { flex: 1; font-weight: 500; }
  .pt-sets { color: #BF5700; font-weight: 600; font-size: 0.82rem; min-width: 80px; }
  .pt-notes { color: #888; font-size: 0.78rem; font-style: italic; }

  .chit-card { border-left: 4px solid #BF5700; padding: 1rem; background: white; border-radius: 8px; margin-bottom: 0.75rem; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
  .chit-route { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem; font-size: 0.78rem; }
  .chit-node { background: rgba(191,87,0,0.1); border-radius: 4px; padding: 2px 7px; color: #8B3D00; }

  .form-row { background: white; border-radius: 10px; padding: 1rem 1.2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; border: 1.5px solid #eee; flex-wrap: wrap; }
  .progress-bar { background: #eee; border-radius: 4px; height: 4px; margin-top: 4px; width: 60px; }
  .progress-fill { background: #BF5700; height: 100%; border-radius: 4px; }

  .roster-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 0; border-bottom: 1px solid #f4f0eb; flex-wrap: wrap; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: #BF5700; color: white; display: flex; align-items: center; justify-content: center; font-family: Oswald; font-weight: 700; font-size: 0.82rem; flex-shrink: 0; }

  .q-card { background: white; border-radius: 10px; padding: 1.2rem; margin-bottom: 1rem; border: 1.5px solid #eee; }
  .q-meta { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
  .q-text { font-size: 0.92rem; line-height: 1.55; margin-bottom: 0.75rem; }
  .answer-block { background: rgba(191,87,0,0.04); border-left: 3px solid #BF5700; padding: 0.55rem 0.75rem; border-radius: 0 6px 6px 0; margin-bottom: 0.5rem; font-size: 0.85rem; }
  .answer-author { font-weight: 600; color: #8B3D00; font-size: 0.78rem; margin-bottom: 0.15rem; }

  .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .modal { background: white; border-radius: 12px; padding: 1.5rem; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .modal-title { font-family: Oswald; font-size: 1.1rem; letter-spacing: 2px; text-transform: uppercase; }
  .modal-close { background: none; border: none; font-size: 1.4rem; color: #888; cursor: pointer; }

  .tag { display: inline-block; padding: 2px 8px; background: rgba(191,87,0,0.1); border-radius: 20px; font-size: 0.72rem; color: #8B3D00; }

  .login-wrap { min-height: 100vh; background: #1A1209; display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .login-card { background: white; border-radius: 14px; padding: 2.25rem 1.75rem; max-width: 380px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .login-logo { display: flex; align-items: center; gap: 0.75rem; justify-content: center; margin-bottom: 1.25rem; }
  .login-mark { width: 48px; height: 48px; background: #BF5700; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-family: Oswald; font-weight: 700; font-size: 1.3rem; color: white; }
  .login-title { font-family: Oswald; font-size: 1.3rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
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
  .stage-dot.pending { border-color:#ddd; background:#f5f5f5; color:#aaa; }
  @keyframes pulse { 0%,100% { box-shadow:0 0 0 4px rgba(191,87,0,0.2); } 50% { box-shadow:0 0 0 8px rgba(191,87,0,0.08); } }
  .stage-label { font-size:0.65rem; text-align:center; margin-top:0.35rem; text-transform:uppercase; letter-spacing:0.5px; line-height:1.3; color:#888; font-family:Oswald; }
  .stage-label.active { color:#BF5700; font-weight:700; }
  .stage-label.done   { color:#2A7D4F; }
  .stage-approver { font-size:0.6rem; color:#aaa; text-align:center; }
  .stage-approver.active { color:#BF5700; }

  .fitrep-card { background:white; border-radius:10px; border:1.5px solid #eee; margin-bottom:1rem; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
  .fitrep-header { padding:0.9rem 1.2rem; border-bottom:1px solid #f5f2ee; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; }
  .fitrep-body { padding:1rem 1.2rem; }
  .stage-comment { background:#f8f6f2; border-left:3px solid #2A7D4F; border-radius:0 6px 6px 0; padding:0.5rem 0.75rem; margin-top:0.4rem; font-size:0.82rem; }
  .stage-comment-by { font-size:0.72rem; color:#2A7D4F; font-weight:600; margin-bottom:0.2rem; font-family:Oswald; letter-spacing:0.5px; text-transform:uppercase; }
  .active-stage-comment { background:#fff9f5; border-left:3px solid #BF5700; border-radius:0 6px 6px 0; padding:0.5rem 0.75rem; margin-top:0.4rem; font-size:0.82rem; }
  .stage-action-box { background:#fff9f5; border:1.5px solid rgba(191,87,0,0.2); border-radius:8px; padding:0.9rem; margin-top:0.75rem; }
  .stage-action-label { font-family:Oswald; font-size:0.72rem; letter-spacing:1.5px; text-transform:uppercase; color:#BF5700; margin-bottom:0.5rem; }

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

function LoginPage({ onLogin, userList }) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr]   = useState("");

  const go = () => {
    const q = name.trim().toLowerCase();
    const user = userList.find(u =>
      u.name.toLowerCase() === q ||
      u.name.split(",")[0].trim().toLowerCase() === q ||
      u.email.toLowerCase() === q ||
      (u.eid && u.eid.toLowerCase() === q)
    );
    if (!user) { setErr("Name not found. Try your last name, email, or EID."); return; }
    if (user.password !== pass.trim()) { setErr("Incorrect password. Contact your S1 if you need a reset."); return; }
    setErr("");
    onLogin(user);
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-mark">UT</div>
          <div className="login-title">NROTC <span>BN</span></div>
        </div>
        <div className="login-sub">Sign in with your battalion credentials</div>
        {err && <div style={{ background:"rgba(192,57,43,0.1)", border:"1.5px solid #C0392B", borderRadius:"6px", padding:"0.55rem 0.9rem", fontSize:"0.84rem", color:"#C0392B", marginBottom:"0.9rem" }}>⚠ {err}</div>}
        <div className="input-group">
          <label className="input-label">Last Name, Email, or EID</label>
          <input className="input" placeholder="Last name, email, or EID" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input className="input" type="password" placeholder="Your password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} />
        </div>
        <button className="btn btn-orange" style={{ width:"100%", justifyContent:"center", marginTop:"0.25rem" }} onClick={go}>
          Sign In →
        </button>
        <div className="hint-box">
          <strong>Username:</strong> your last name, full email, or EID<br />
          Contact your S1 (ADJ) if you need a password reset.
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onNav }) {
  const { user } = useAuth();
  return (
    <div>
      <div className="page-title">BN <span>Dashboard</span></div>
      <div className="page-sub">Welcome, {user.rank} {user.name} — Spring 2026</div>

      <div className="alert">
        🔔 <strong>Reminder:</strong> ACFT Readiness survey closes Mar 18. PT formation tomorrow 0530 at Gregory Gym.
      </div>

      <div className="grid3" style={{ marginBottom:"1rem" }}>
        <div className="stat"><div className="stat-n">{USERS.length}</div><div className="stat-l">BN Strength</div></div>
        <div className="stat" style={{ borderLeftColor:"#0D1B2A" }}><div className="stat-n" style={{ color:"#0D1B2A" }}>3</div><div className="stat-l">Open CHITs</div></div>
        <div className="stat" style={{ borderLeftColor:"#2A7D4F" }}><div className="stat-n" style={{ color:"#2A7D4F" }}>4</div><div className="stat-l">Active Forms</div></div>
      </div>

      <div className="grid2">
        <div>
          <div className="potw-card">
            <div className="potw-week">📖 {POTW.week}</div>
            <div className="potw-title">POTW: {POTW.title}</div>
            <div className="potw-body">{POTW.body}</div>
            {POTW.points.map((p,i) => <div key={i} style={{ fontSize:"0.82rem", color:"#aaa", marginBottom:"2px" }}>✓ {p}</div>)}
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">📅 Upcoming Events</span>
              <button className="btn btn-outline btn-sm" onClick={() => onNav("calendar")}>View All</button>
            </div>
            {EVENTS.slice(0,4).map((e,i) => (
              <div className="event-row" key={i}>
                <div className="event-date"><div className="event-day">{e.date}</div><div className="event-mo">{e.month}</div></div>
                <div style={{ flex:1 }}>
                  <div className="event-title">{e.title}</div>
                  <div className="event-sub">{e.time} · {e.location}</div>
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
            <div style={{ fontSize:"0.88rem" }}>{FORMS.filter(f => f.status === "Open").length} forms open for your response.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarPage() {
  const { user } = useAuth();
  return (
    <div>
      <div className="page-title"><span>Calendar</span> & POTW</div>
      <div className="page-sub">Battalion schedule — connect Google Calendar ID in config to go live</div>
      <div className="potw-card">
        <div className="potw-week">📖 {POTW.week}</div>
        <div className="potw-title">{POTW.title}</div>
        <div className="potw-body">{POTW.body}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", marginTop:"0.5rem" }}>
          {POTW.points.map((p,i) => <span key={i} style={{ background:"rgba(255,255,255,0.1)", borderRadius:"20px", padding:"2px 10px", fontSize:"0.78rem" }}>✓ {p}</span>)}
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">📅 March 2026</span>
          {canEdit(user,"potw") && <span style={{fontFamily:"Oswald",fontSize:"0.72rem",letterSpacing:"1.5px",textTransform:"uppercase",color:"#BF5700"}}>✏ Senior Staff — edit EVENTS array to update</span>}
        </div>
        {EVENTS.map((e,i) => (
          <div className="event-row" key={i}>
            <div className="event-date"><div className="event-day">{e.date}</div><div className="event-mo">{e.month}</div></div>
            <div style={{ flex:1 }}>
              <div className="event-title">{e.title}</div>
              <div className="event-sub">🕐 {e.time} · 📍 {e.location}</div>
            </div>
            <span className="badge badge-navy">{e.type}</span>
          </div>
        ))}
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
      <div className="page-sub">UT NROTC Battalion — {grandTotal} Personnel</div>

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

function TrainingPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("pt");
  const [open, setOpen] = useState({ 0:true, 1:false, 2:false });
  return (
    <div>
      <div className="page-title">Training <span>Plans</span></div>
      <div className="page-sub">Weekly PT and Leadership Lab Schedules</div>
      <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.25rem", borderBottom:"2px solid #eee", paddingBottom:"-2px" }}>
        {["pt","leadlab"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"0.5rem 1rem", fontFamily:"Oswald", fontSize:"0.8rem", letterSpacing:"1.5px", textTransform:"uppercase", cursor:"pointer", background:"none", border:"none", borderBottom: tab===t ? "2px solid #BF5700":"2px solid transparent", color: tab===t ? "#BF5700":"#888", marginBottom:"-2px" }}>
            {t === "pt" ? "PT Plan" : "LeadLab"}
          </button>
        ))}
      </div>
      {tab === "pt" && (
        <>
          <div className="alert">💪 ACFT goal: All Mids score 60+ per event by Apr 30.</div>
      {canEdit(user,"pt") && (
        <div style={{marginBottom:"0.75rem"}}>
          <span style={{fontFamily:"Oswald",fontSize:"0.72rem",letterSpacing:"1.5px",textTransform:"uppercase",color:"#BF5700"}}>✏ PTO Edit Mode — you can update this plan</span>
        </div>
      )}
          {PT.map((d,i) => (
            <div className="pt-block" key={i}>
              <div className="pt-header" onClick={() => setOpen(s => ({ ...s, [i]:!s[i] }))}>
                <span>{d.day} — {d.focus}</span>
                <span>{open[i] ? "▲" : "▼"}</span>
              </div>
              {open[i] && d.exercises.map((ex,j) => (
                <div className="pt-row" key={j}>
                  <div className="pt-name">{ex.name}</div>
                  <div className="pt-sets">{ex.sets}</div>
                  {ex.notes && <div className="pt-notes">{ex.notes}</div>}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
      {tab === "leadlab" && canEdit(user,"leadlab") && (
        <div style={{marginBottom:"0.75rem"}}>
          <span style={{fontFamily:"Oswald",fontSize:"0.72rem",letterSpacing:"1.5px",textTransform:"uppercase",color:"#BF5700"}}>✏ TRAINO Edit Mode — you can update this schedule</span>
        </div>
      )}
      {tab === "leadlab" && LEADLAB.map((ll,i) => (
        <div className="card" key={i}>
          <div className="card-header"><span className="card-title">{ll.title}</span><span className="badge badge-orange">{ll.date}</span></div>
          <div style={{ marginBottom:"0.75rem" }}>
            <div style={{ fontFamily:"Oswald", fontSize:"0.72rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#888", marginBottom:"0.35rem" }}>Objectives</div>
            {ll.objectives.map((o,j) => <div key={j} style={{ display:"flex", gap:"0.5rem", fontSize:"0.86rem", marginBottom:"0.2rem" }}><span style={{ color:"#BF5700", flexShrink:0 }}>▸</span>{o}</div>)}
          </div>
          <div style={{ background:"#f5f2ee", borderRadius:"6px", padding:"0.6rem 0.8rem", fontSize:"0.8rem", color:"#666" }}>📋 {ll.notes}</div>
        </div>
      ))}
    </div>
  );
}

function ChitsPage({ chits, setChits }) {
  const { user } = useAuth();
  const coc = isCoC(user);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ date:"", reason:"", notes:"" });

  const canSeeAll = isCoC(user);
  const visible = canSeeAll ? chits : chits.filter(c => c.userId === user.id);

  const fire = msg => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const submit = () => {
    if (!form.date || !form.reason) return;
    const c = {
      id: "CHT-" + String(chits.length + 1).padStart(3, "0"),
      userId: user.id,
      name: user.name,
      company: normalizeCompany(user.company),
      platoon: user.platoon,
      date: form.date,
      reason: form.reason,
      notes: form.notes,
      status: "Pending",
      route: [user.platoon + " PC", getCompanyShortName(user.company) + " Co CDR", "ADJ (Courtney)", "BNXO (Townsend)", "BNCO (Hinz)"],
    };
    setChits(prev => [...prev, c]);
    setShowModal(false);
    setForm({ date:"", reason:"", notes:"" });
    fire("✅ CHIT submitted! Your chain of command has been notified.");
  };

  const updateStatus = (id, status) => {
    setChits(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    fire("CHIT " + id + " marked " + status + ".");
  };

  return (
    <div>
      <div className="page-title">CHIT <span>Routing</span></div>
      <div className="page-sub">Submit and track absence requests</div>

      {toast && <div className="alert alert-green">{toast}</div>}

      <div className="privacy-note">
        🔒 {coc
          ? <strong>CoC View — you can see all battalion CHITs ({user.role.replace("_"," ").toUpperCase()})</strong>
          : <span><strong>Private.</strong> Only you and your chain of command can see your CHITs.</span>}
      </div>

      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"1rem" }}>
        <button className="btn btn-orange" onClick={() => setShowModal(true)}>+ Submit New CHIT</button>
      </div>

      {visible.length === 0 && <div className="empty"><div style={{ fontSize:"2rem" }}>📋</div><div style={{ marginTop:"0.5rem" }}>No CHITs on file.</div></div>}

      {visible.map((c, i) => (
        <div className="chit-card" key={i}>
          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem", marginBottom:"0.3rem" }}>
            <div>
              <strong>{c.id}</strong>
              {coc && <span style={{ color:"#888", fontSize:"0.82rem", marginLeft:"0.75rem" }}>{c.name} · {formatCompanyCoLabel(c.company)}, {c.platoon} Plt</span>}
            </div>
            <span className={`badge ${c.status==="Approved" ? "badge-green" : c.status==="Denied" ? "badge-red" : "badge-orange"}`}>{c.status}</span>
          </div>
          <div style={{ fontSize:"0.82rem", color:"#666" }}>{c.reason} · Absent: {c.date}</div>
          {c.notes && <div style={{ fontSize:"0.8rem", color:"#888", fontStyle:"italic", marginTop:"0.2rem" }}>{c.notes}</div>}
          <div className="chit-route">
            <span style={{ color:"#888", fontFamily:"Oswald", fontSize:"0.68rem", letterSpacing:"1.5px", textTransform:"uppercase" }}>Route:</span>
            {c.route.map((n, j) => (
              <span key={j} style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem" }}>
                <span className="chit-node">{n}</span>
                {j < c.route.length - 1 && <span style={{ color:"#BF5700" }}>→</span>}
              </span>
            ))}
          </div>
          {coc && c.status === "Pending" && (
            <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.75rem" }}>
              <button className="btn btn-green btn-sm" onClick={() => updateStatus(c.id, "Approved")}>✓ Approve</button>
              <button className="btn btn-red btn-sm" onClick={() => updateStatus(c.id, "Denied")}>✕ Deny</button>
            </div>
          )}
        </div>
      ))}

      {showModal && (
        <Modal title="Submit CHIT" onClose={() => setShowModal(false)}>
          <div className="privacy-note">🔒 Private — only you and your CoC will see this.</div>
          <div className="input-group">
            <label className="input-label">Date of Absence</label>
            <input className="input" type="date" value={form.date} onChange={e => setForm(s => ({ ...s, date:e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="input-label">Reason</label>
            <select className="input" value={form.reason} onChange={e => setForm(s => ({ ...s, reason:e.target.value }))}>
              <option value="">Select reason…</option>
              <option>Medical Appointment</option>
              <option>Academic Conflict — Exam</option>
              <option>Academic Conflict — Lab</option>
              <option>Family Emergency</option>
              <option>Personal Emergency</option>
              <option>Other</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Notes (optional)</label>
            <textarea className="input" style={{ minHeight:"80px", resize:"vertical" }} value={form.notes} onChange={e => setForm(s => ({ ...s, notes:e.target.value }))} />
          </div>
          <div style={{ background:"#f5f2ee", borderRadius:"8px", padding:"0.65rem", fontSize:"0.8rem", color:"#666", marginBottom:"1rem" }}>
            Submitting notifies: <strong>PC → Co CDR → ADJ → BNXO → BNCO</strong>
          </div>
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"flex-end" }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-orange" onClick={submit}>Submit & Notify CoC</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function RosterPage() {
  const [q, setQ] = useState("");
  const [co, setCo] = useState("");
  const fil = ROSTER.filter(p =>
    (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.rank.toLowerCase().includes(q.toLowerCase())) &&
    (!co || normalizeCompany(p.company) === co)
  );
  return (
    <div>
      <div className="page-title">Recall <span>Roster</span></div>
      <div className="page-sub">BN contact directory — replace ROSTER array with your real data, or connect Google Sheets</div>
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1rem", flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:"180px" }}>
          <span style={{ position:"absolute", left:"0.7rem", top:"50%", transform:"translateY(-50%)", color:"#aaa" }}>🔍</span>
          <input className="input" style={{ paddingLeft:"2.1rem" }} placeholder="Search name or rank…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="input" style={{ maxWidth:"170px" }} value={co} onChange={e => setCo(e.target.value)}>
          <option value="">All Companies</option>
          <option value="BN">BN</option><option value="Alpha">Alpha</option><option value="Bravo">Bravo</option><option value="Charlie">Charlie</option>
        </select>
      </div>
      <div className="card">
        <div style={{ fontSize:"0.78rem", color:"#888", marginBottom:"0.75rem" }}>{fil.length} result{fil.length !== 1 ? "s" : ""}</div>
        {fil.length === 0 && <div className="empty">No results found.</div>}
        {fil.map((p, i) => (
          <div className="roster-row" key={i}>
            <div className="avatar">{p.initials}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:"0.9rem" }}>{p.name}</div>
              <div style={{ fontSize:"0.78rem", color:"#BF5700", fontWeight:600 }}>{p.rank}</div>
              <div style={{ fontSize:"0.78rem", color:"#888" }}>{formatCompanyCoLabel(p.company)} · {p.platoon} Plt</div>
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

function FormsPage() {
  const { user } = useAuth();
  const coc = canEdit(user,"forms");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  return (
    <div>
      <div className="page-title">Forms & <span>Surveys</span></div>
      <div className="page-sub">Battalion Google Forms hub</div>
      {toast && <div className="alert alert-green">{toast}</div>}
      <div className="grid3" style={{ marginBottom:"1rem" }}>
        <div className="stat"><div className="stat-n">{FORMS.filter(f => f.status==="Open").length}</div><div className="stat-l">Open Forms</div></div>
        <div className="stat" style={{ borderLeftColor:"#2A7D4F" }}><div className="stat-n" style={{ color:"#2A7D4F" }}>{FORMS.reduce((a,f) => a+f.responses,0)}</div><div className="stat-l">Total Responses</div></div>
        <div className="stat" style={{ borderLeftColor:"#0D1B2A" }}><div className="stat-n" style={{ color:"#0D1B2A" }}>82</div><div className="stat-l">BN Strength</div></div>
      </div>
      {coc && <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"1rem" }}><button className="btn btn-orange" onClick={() => setShowModal(true)}>+ Share New Form</button></div>}
      {FORMS.map((f, i) => (
        <div className="form-row" key={i}>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:600, marginBottom:"0.2rem" }}>{f.title}</div>
            <div style={{ fontSize:"0.8rem", color:"#888" }}>Deadline: {f.deadline} · <span className="tag">{f.type}</span></div>
          </div>
          <div style={{ textAlign:"center", minWidth:"58px" }}>
            <div style={{ fontFamily:"Oswald", fontSize:"1.4rem", fontWeight:700, color:"#BF5700", lineHeight:1 }}>{f.responses}</div>
            <div style={{ fontSize:"0.68rem", color:"#888", textTransform:"uppercase" }}>/ {f.total}</div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: Math.round(f.responses/f.total*100) + "%" }} /></div>
          </div>
          <div style={{ display:"flex", gap:"0.5rem", alignItems:"center", flexWrap:"wrap" }}>
            <span className={`badge ${f.status==="Open" ? "badge-green":"badge-gray"}`}>{f.status}</span>
            {f.status === "Open" && <button className="btn btn-orange btn-sm">Fill Out ↗</button>}
            {coc && <button className="btn btn-outline btn-sm">Results</button>}
          </div>
        </div>
      ))}
      {showModal && (
        <Modal title="Share New Form" onClose={() => setShowModal(false)}>
          <div className="input-group"><label className="input-label">Form Title</label><input className="input" placeholder="e.g. ACFT Readiness Survey" /></div>
          <div className="input-group"><label className="input-label">Google Form URL</label><input className="input" placeholder="https://forms.google.com/…" /></div>
          <div className="input-group"><label className="input-label">Category</label>
            <select className="input"><option>Admin</option><option>PT</option><option>Training</option><option>Event</option></select>
          </div>
          <div className="input-group"><label className="input-label">Deadline</label><input className="input" type="date" /></div>
          <div className="input-group"><label className="input-label">Distribute To</label>
            <select className="input"><option>Entire Battalion</option><option>Alpha Company</option><option>Bravo Company</option><option>Charlie Company</option></select>
          </div>
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"flex-end" }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-orange" onClick={() => { setShowModal(false); setToast("Form shared with the battalion!"); }}>Share Form</button>
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
              <div style={{ fontFamily:"Oswald", fontSize:"0.7rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#888", marginBottom:"0.5rem" }}>
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
function FitrepsPage({ fitrebs, setFitrebs }) {
  const { user } = useAuth();
  const [activeComment, setActiveComment] = useState(null); // id of fitrep being commented on
  const [commentText, setCommentText]     = useState("");
  const [toast, setToast]                 = useState("");
  const [filter, setFilter]               = useState("");

  const fire = msg => { setToast(msg); setTimeout(() => setToast(""), 3500); };

  // Scope: seniors/adj see all; co_cdr sees their company; plt_cdr sees their platoon; mids see only their own
  const visible = (() => {
    if (isSenior(user) || user.role === "adj") return fitrebs;
    if (user.role === "co_cdr")  return fitrebs.filter(f => normalizeCompany(f.company) === normalizeCompany(user.company));
    if (user.role === "plt_cdr") return fitrebs.filter(f => normalizeCompany(f.company) === normalizeCompany(user.company) && f.platoon === user.platoon);
    return fitrebs.filter(f => f.subjectId === user.id);
  })();

  const filtered = filter ? visible.filter(f => normalizeCompany(f.company) === filter) : visible;

  const advanceStage = (id) => {
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
      const next = Math.min(f.currentStage + 1, FITREP_STAGES.length - 1);
      return { ...f, currentStage: next, stages: updated };
    }));
    setActiveComment(null);
    setCommentText("");
    fire("✅ FITREP advanced. Stage comments saved.");
  };

  const stageLabel = (idx) => {
    const s = FITREP_STAGES[idx];
    if (!s) return "";
    if (idx === FITREP_STAGES.length - 1) return "Complete";
    return s.name;
  };

  const companies = [...new Set(fitrebs.map(f => normalizeCompany(f.company)))];

  return (
    <div>
      <div className="page-title">FITREP <span>Tracker</span></div>
      <div className="page-sub">Fitness Report pipeline — {fitrebs.length} report{fitrebs.length !== 1 ? "s" : ""} in system</div>

      {toast && <div className="alert alert-green">{toast}</div>}

      {/* Summary stats */}
      <div className="grid3" style={{ marginBottom:"1rem" }}>
        <div className="stat">
          <div className="stat-n">{fitrebs.filter(f => f.currentStage > 0 && f.currentStage < FITREP_STAGES.length - 1).length}</div>
          <div className="stat-l">In Progress</div>
        </div>
        <div className="stat" style={{ borderLeftColor:"#2A7D4F" }}>
          <div className="stat-n" style={{ color:"#2A7D4F" }}>{fitrebs.filter(f => f.currentStage === FITREP_STAGES.length - 1).length}</div>
          <div className="stat-l">Complete</div>
        </div>
        <div className="stat" style={{ borderLeftColor:"#0D1B2A" }}>
          <div className="stat-n" style={{ color:"#0D1B2A" }}>{fitrebs.filter(f => f.currentStage === 1).length}</div>
          <div className="stat-l">Awaiting PC</div>
        </div>
      </div>

      {/* Filters (CoC only) */}
      {isCoC(user) && (
        <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1rem", flexWrap:"wrap" }}>
          <select className="input" style={{ maxWidth:"200px" }} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">All Companies</option>
            {companies.map(c => <option key={c} value={c}>{getCompanyShortName(c)}</option>)}
          </select>
          <span style={{ fontSize:"0.82rem", color:"#888", alignSelf:"center" }}>{filtered.length} report{filtered.length !== 1 ? "s" : ""} shown</span>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="empty">
          <div style={{ fontSize:"2rem" }}>📋</div>
          <div style={{ marginTop:"0.5rem" }}>No FITREPs on file.</div>
        </div>
      )}

      {filtered.map(f => {
        const canAct = canActOnFitrep(user, f);
        const isDone = f.currentStage >= FITREP_STAGES.length - 1;
        const currentStageName = stageLabel(f.currentStage);

        return (
          <div className="fitrep-card" key={f.id}>
            {/* Card header */}
            <div className="fitrep-header">
              <div>
                <strong style={{ fontSize:"0.95rem" }}>{f.subjectRank} {f.subjectName}</strong>
                <div style={{ fontSize:"0.78rem", color:"#888", marginTop:"1px" }}>{formatCompanyCoLabel(f.company)} · {f.platoon} · {f.period}</div>
              </div>
              <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
                <span className="badge badge-navy">{f.id}</span>
                {isDone
                  ? <span className="badge badge-green">Complete</span>
                  : <span className="badge badge-orange">{currentStageName}</span>
                }
                {canAct && !isDone && (
                  <span className="badge" style={{ background:"rgba(42,125,79,0.15)", color:"#2A7D4F" }}>● Your Action</span>
                )}
              </div>
            </div>

            {/* Stage tracker */}
            <div className="fitrep-body">
              <div className="stage-track">
                {FITREP_STAGES.map((s, i) => {
                  const done    = i < f.currentStage;
                  const active  = i === f.currentStage && !isDone;
                  const pending = i > f.currentStage;
                  return (
                    <div key={i} className={`stage-item ${done ? "done" : active ? "active" : ""}`}>
                      <div className={`stage-dot ${done ? "done" : active ? "active" : "pending"}`}>
                        {done ? "✓" : s.icon}
                      </div>
                      <div className={`stage-label ${done ? "done" : active ? "active" : ""}`}>{s.name}</div>
                      {active && canAct && <div className="stage-approver active">● You</div>}
                    </div>
                  );
                })}
              </div>

              {/* Stage comments (completed stages) */}
              {f.stages.some(s => s.completedBy && s.comment) && (
                <div style={{ marginTop:"0.75rem" }}>
                  <div style={{ fontFamily:"Oswald", fontSize:"0.7rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#888", marginBottom:"0.5rem" }}>Stage Comments</div>
                  {f.stages.map((s, i) => s.completedBy && s.comment ? (
                    <div className="stage-comment" key={i}>
                      <div className="stage-comment-by">{FITREP_STAGES[i]?.name} · {s.completedBy} · {s.completedAt}</div>
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
                        <button className="btn btn-green btn-sm" onClick={() => advanceStage(f.id)}>
                          ✓ Approve & Advance
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
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────
const NAV = [
  { id:"dashboard", label:"Dashboard",     icon:"🏠" },
  { id:"calendar",  label:"Calendar/POTW", icon:"📅" },
  { id:"structure", label:"BN Structure",  icon:"🏛" },
  { id:"training",  label:"PT & LeadLab",  icon:"💪" },
  { id:"chits",     label:"CHIT Routing",  icon:"📋" },
  { id:"fitreps",   label:"FITREPs",       icon:"📊" },
  { id:"roster",    label:"Recall Roster", icon:"📒" },
  { id:"forms",     label:"Forms",         icon:"📝" },
  { id:"academic",  label:"Academic Board",icon:"🎓" },
];

const MNAV = [
  { id:"dashboard", label:"Home",    icon:"🏠" },
  { id:"calendar",  label:"Cal",     icon:"📅" },
  { id:"chits",     label:"CHITs",   icon:"📋" },
  { id:"fitreps",   label:"FITREPs", icon:"📊" },
  { id:"roster",    label:"Roster",  icon:"📒" },
];

export default function App() {
  const [user, setUser]           = useState(null);
  const [page, setPage]           = useState("dashboard");
  const [chits, setChits]         = useState(INIT_CHITS);
  const [fitrebs, setFitrebs]     = useState(INIT_FITREBS);
  const [showAccount, setShowAccount] = useState(false);
  // userList: starts as hardcoded USERS, overridden by Google Sheet if SHEETS_CSV_URL is set
  const [userList, setUserList]   = useState(USERS);

  // Fetch roster from private Google Sheet via Apps Script on mount
  useEffect(() => {
    if (!SHEETS_API_URL) return;
    const url = `${SHEETS_API_URL}?token=${encodeURIComponent(SHEETS_API_TOKEN)}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.users && data.users.length > 0) {
          const mapped = data.users.map((row, i) => sheetRowToUser(row, i));
          setUserList(mapped);
        }
      })
      .catch(() => {}); // silently fall back to hardcoded USERS
  }, []);

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
        <LoginPage onLogin={handleLogin} userList={userList} />
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
    if (page === "dashboard")  return <Dashboard onNav={setPage} />;
    if (page === "calendar")   return <CalendarPage />;
    if (page === "structure")  return <StructurePage userList={userList} />;
    if (page === "training")   return <TrainingPage />;
    if (page === "chits")      return <ChitsPage chits={chits} setChits={setChits} />;
    if (page === "fitreps")    return <FitrepsPage fitrebs={fitrebs} setFitrebs={setFitrebs} />;
    if (page === "roster")     return <RosterPage />;
    if (page === "forms")      return <FormsPage />;
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
            <div className="topbar-title">NROTC <span>Battalion</span></div>
          </div>
          <div className="topbar-right">
            <div
              style={{ display:"flex", alignItems:"center", gap:"0.5rem", cursor:"pointer" }}
              onClick={() => setShowAccount(true)}
              title="Account Info"
            >
              <span className="rank-pill">{user.rank.split("/")[1] || user.rank}</span>
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
                  <span>{item.icon}</span> {item.label}
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
