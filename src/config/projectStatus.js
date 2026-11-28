export const STATUS_STYLES = {
  PLANNING: "bg-muted text-muted-foreground border-border",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
  ON_HOLD: "bg-orange-50 text-orange-700 border-orange-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

export const STATUS_LABEL = {
  PLANNING: "Planning",
  PENDING: "Pending",
  IN_PROGRESS: "Ongoing",
  ON_HOLD: "On hold",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const STATUS_TABS = [
  { value: "ALL", label: "All" },
  ...Object.entries(STATUS_LABEL).map(([value, label]) => ({ value, label })),
];