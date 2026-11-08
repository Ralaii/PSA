import { useNavigate } from "react-router";
import { useGlobalSearch } from "../../hooks/search/useGlobalSearch";

function GlobalSearchResults({ query = "", onSelect }) {
  const navigate = useNavigate();
  const { groups, isLoading, term } = useGlobalSearch(query);

  if (!term) return null;

  const go = (to) => {
    onSelect?.();
    navigate(to);
  };

  return (
    <div className="absolute left-0 top-full z-30 mt-2 max-h-96 w-full min-w-72 overflow-y-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg md:w-96 dark:border-zinc-700 dark:bg-zinc-900">
      {isLoading && groups.length === 0 && (
        <p className="px-3 py-4 text-center text-sm text-zinc-500">Searching...</p>
      )}

      {!isLoading && groups.length === 0 && (
        <p className="px-3 py-4 text-center text-sm text-zinc-500">
          No results for "{query}"
        </p>
      )}

      {groups.map(({ source, items}) => (
        <div key={source.key}>
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {source.label}
          </p>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(source.to(item))}
              className="block w-full cursor-pointer px-3 py-2 text-left transition hover:bg-blue-100 dark:hover:bg-zinc-800"
            >
              <span className="block truncate text-sm text-zinc-800 dark:text-zinc-100">
                {source.title(item)}
              </span>
              <span className="block truncate text-xs text-zinc-500">
                {source.subtitle(item)}
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GlobalSearchResults;