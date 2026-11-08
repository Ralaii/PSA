const AVATAR_COLORS = [
  "bg-orange-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-emerald-500",
];

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

function EmployeeAvatar({ id, name }) {
  return (
    <span
      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white ${
        AVATAR_COLORS[id % AVATAR_COLORS.length]
      }`}
    >
      {initials(name)}
    </span>
  );
}

export default EmployeeAvatar;