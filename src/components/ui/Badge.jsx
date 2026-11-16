function Badge({ cls, children }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {children}
    </span>
  );
}

export default Badge;