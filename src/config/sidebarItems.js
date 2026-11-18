import {
  BsPeople,
  BsGear,
  BsTrash,
} from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { LuFiles } from "react-icons/lu";

export const sidebarItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiHome },
  { to: "/project", label: "Project", icon: BiTask},
  { to: "/files", label: "Files", icon: LuFiles },
  { to: "/employee", label: "Employee", icon: BsPeople },
  { to: "/settings", label: "Settings", icon: BsGear },
  { to: "/trash", label: "Trash", icon: BsTrash },
];