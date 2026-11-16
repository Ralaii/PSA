import { icons } from "lucide-react";
import {
  BsPeople,
  BsCalendarCheck,
  BsPersonPlus,
  BsCalendar3,
  BsGear,
  BsTrash,
} from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { MdInbox } from "react-icons/md";

export const sidebarItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiHome },
  { to: "/inbox", label: "Inbox", icon: MdInbox },
  { to: "/project", label: "Project", icon: BiTask},
  { to: "/employee", label: "Employee", icon: BsPeople },
  { to: "/attendance", label: "Attendance", icon: BsCalendarCheck },
  { to: "/recruitment", label: "Recruitment", icon: BsPersonPlus },
  { to: "/schedule", label: "Schedule", icon: BsCalendar3 },
  { to: "/settings", label: "Settings", icon: BsGear },
  { to: "/trash", label: "Trash", icon: BsTrash },
];