import Card from "./Card";

// A card with a titled header and an optional action on the right
function SectionCard({ title, action, className = "", children }) {
  return (
    <Card className={`min-w-0 ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-800">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </Card>
  );
}

export default SectionCard;