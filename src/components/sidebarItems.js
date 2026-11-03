import {
  BsPeople,
  BsCalendarCheck,
  BsPersonPlus,
  BsCalendar3,
  BsGear,
  BsTrash,
} from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { MdInbox } from "react-icons/md";

export const sidebarItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiHome },
  { to: "/inbox", label: "Inbox", icon: MdInbox },
  { to: "/employee", label: "Employee", icon: BsPeople },
  { to: "/attendance", label: "Attendance", icon: BsCalendarCheck },
  { to: "/recruitment", label: "Recruitment", icon: BsPersonPlus },
  { to: "/schedule", label: "Schedule", icon: BsCalendar3 },
  { to: "/settings", label: "Settings", icon: BsGear },
  { to: "/trash", label: "Trash", icon: BsTrash },
];