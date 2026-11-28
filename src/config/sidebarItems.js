import {
  BsPeople,
  BsGear,
  BsTrash,
} from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { FiHome } from "react-icons/fi";

export const sidebarItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiHome },
  { to: "/project", label: "Project", icon: BiTask},
  { to: "/employee", label: "Employee", icon: BsPeople },
  { to: "/settings", label: "Settings", icon: BsGear },
  { to: "/trash", label: "Trash", icon: BsTrash },
];