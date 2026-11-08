function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      {children}
    </section>
  );
}

export default Card;