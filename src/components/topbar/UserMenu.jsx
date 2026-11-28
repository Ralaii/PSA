import UserMenuDropdown from "./UserMenuDropdown";
import Dropdown from "../ui/Dropdown";

const getInitials = (name = "") => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
const formatRole = (role = "") => role.charAt(0) + role.slice(1).toLocaleLowerCase().replace(/_/g, " ");

function UserMenu({user, logout, isLoggingOut}) {
  return(
    <Dropdown
      panelClassName="sm:w-56"
      trigger={({ open, toggle}) => (
        <button
          type="button"
          onClick={toggle}
          aria-haspopup="menu"
          aria-expanded={open}
          className="ml-1 flex cursor-pointer items-center gap-3"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-300 text-sm font-medium dark:bg-zinc-700">
            {getInitials(user?.name)}
          </span>
          <span className="hidden text-left leading-tight lg:block">
            <span className="block text-sm font-medium">{user?.name}</span>
            <span className="block text-xs text-zinc-500">{formatRole(user?.role)}</span>
          </span>
        </button>
      )}
    >
      {({ close }) => <UserMenuDropdown 
                        user={user} 
                        onClose={close} 
                        onLogout={logout}
                      />}
    </Dropdown>

  )
}

export default UserMenu
