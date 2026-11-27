import { STATUS_LABEL, STATUS_STYLES } from "@/config/projectStatus";

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
        STATUS_STYLES[status] ?? STATUS_STYLES.PLANNING
      }`}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

export default StatusBadge;