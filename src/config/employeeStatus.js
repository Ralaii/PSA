const NEUTRAL = "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300";

export const EMPLOYEE_STATUS = {
  PROBATIONARY: {
    label: "Probationary",
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  },
  REGULAR: {
    label: "Regular",
    cls: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
  },
  RESIGNED: {
    label: "Resigned",
    cls: NEUTRAL,
  },
  TERMINATED: {
    label: "Terminated",
    cls: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  },
};

// Statuses that end employment, and the label for their end date
export const SEPARATION_LABEL = {
  RESIGNED: "Date resigned",
  TERMINATED: "Date terminated",
};

export const PROJECT_STATUS = {
  PLANNING: {
    label: "Planning",
    cls: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
  },
  PENDING: {
    label: "Pending",
    cls: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
  },
  IN_PROGRESS: {
    label: "In progress",
    cls: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  },
  ON_HOLD: {
    label: "On hold",
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  },
  COMPLETED: {
    label: "Completed",
    cls: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
  },
  CANCELLED: {
    label: "Cancelled",
    cls: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  },
};

export const getEmployeeStatus = (status) =>
  EMPLOYEE_STATUS[status] ?? { label: status ?? "Unknown", cls: NEUTRAL };

export const getProjectStatus = (status) =>
  PROJECT_STATUS[status] ?? { label: status ?? "Unknown", cls: NEUTRAL };