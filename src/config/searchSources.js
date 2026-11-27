import { employeeService } from "../services/employeeService";
import { notificationService } from "../services/notificationService";
import { projectService } from "@/services/projectService";
import { STATUS_LABEL } from "./projectStatus";

export const searchSources = [
  {
    key: "employees",
    label: "Employees",
    search: (q) => employeeService.search(q),
    title: (e) => e.name,
    subtitle: (e) => `${e.employeeNum} · ${e.position}`,
    to: (e) => `/employee/${e.id}`,
  },
  // {
  //   key: "notifications",
  //   label: "Notifications",
  //   search: (q) => notificationService.search(q),
  //   title: (n) => n.title,
  //   subtitle: (n) => n.text,
  //   to: (n) => `/inbox/${n.id}`,
  // },
  {
    key: "projects",
    label: "Projects",
    search: (q) => projectService.search(q),
    title: (p) => p.name,
    subtitle: (p) => `${p.projectNumber} · ${STATUS_LABEL[p.status] ?? p.status}`,
    to: (p) => `/project/${p.id}`,
  },
];