import { GoSidebarExpand } from "react-icons/go";
import { useSettings } from "../context/SettingContext";

const HOVER_QUERY = "(hover: hover) and (min-width: 768px)";

function Toggle({ checked, onChange, id, disabled = false }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 ${
        checked ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SettingRow({ id, title, description, note, children }) {
  return (
    <div className="flex items-center justify-between gap-6 px-5 py-4">
      <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer">
        <p className="font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
        {note && (
          <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">
            {note}
          </p>
        )}
      </label>
      {children}
    </div>
  );
}

function SettingsSection({ icon: Icon, title, description, children }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-lg text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
          <Icon />
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>

      <div className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
        {children}
      </div>
    </section>
  );
}

function Settings() {
  const { hoverExpand, setHoverExpand } = useSettings();
  const deviceCanHover = window.matchMedia(HOVER_QUERY).matches;

  return (
    <div className="w-full max-w-3xl space-y-8 p-6">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Manage how the app looks and behaves. Changes are saved automatically.
      </p>

      <SettingsSection
        icon={GoSidebarExpand}
        title="Sidebar"
        description="Control how the navigation sidebar behaves."
      >
        <SettingRow
          id="hover-expand"
          title="Expand on hover"
          description="When the sidebar is collapsed, temporarily open it while your mouse is over it."
          note={
            !deviceCanHover
              ? "Only available on larger screens with a mouse."
              : undefined
          }
        >
          <Toggle
            id="hover-expand"
            checked={hoverExpand && deviceCanHover}
            onChange={setHoverExpand}
            disabled={!deviceCanHover}
          />
        </SettingRow>
      </SettingsSection>
    </div>
  );
}

export default Settings;