function todayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// former = has an end date that is already in the past
export function isFormerMember(member, today = todayISO()) {
  return !!member.endDate && member.endDate < today;
}