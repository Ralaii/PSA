import { BsPersonPlus, BsCalendarCheck, BsCalendar3, BsMegaphone, BsBell } from "react-icons/bs";

export const typeMeta = {
  recruitment: { label: "Recruitment", icon: <BsPersonPlus /> },
  attendance: { label: "Attendance", icon: <BsCalendarCheck /> },
  schedule: { label: "Schedule", icon: <BsCalendar3 /> },
  announcement: { label: "Announcement", icon: <BsMegaphone /> },
};

export const fallbackMeta = { label: "Notification", icon: <BsBell /> };