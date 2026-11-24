import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg"

const menuClass = "flex items-center gap-3 w-full px-3 py-2 text-left text-sm semi-bold hover:bg-zinc-300 dark:hover-black cursor-pointer border-b border-zinc-200 dark:border-zinc-700"

function UserMenuDropdown({ user, onClose, onLogout}) {
  return(
    <div role="menu">
      <div className={menuClass}><CgProfile/>Profile</div>
      <button
        type="button"
        role="menuItem"
        onClick={() => {
          onClose();
          onLogout();
        }}
        className={menuClass}
      >
        <FiLogOut/>Logout
      </button>
    </div>
  );
} 

export default UserMenuDropdown;