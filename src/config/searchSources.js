import { employeeService } from "../services/employeeService";
import { notificationService } from "../services/notificationService";

export const searchSources = [
  {
    key: "employees",
    label: "Employees",
    search: (q) => employeeService.search(q),
    title: (e) => e.name,
    subtitle: (e) => `${e.employeeNumber} · ${e.position}`,
    to: (e) => `/employee/${e.id}`,
  },
  {
    key: "notifications",
    label: "Notifications",
    search: (q) => notificationService.search(q),
    title: (n) => n.title,
    subtitle: (n) => n.text,
    to: (n) => `/inbox/${n.id}`,
  },
  // {
  //   key: "projects",
  //   label: "Projects",
  //   fetchAll: () => projectService.search(),
  //   text: (p) => `${p.name} ${p.description ?? ""}`,
  //   title: (p) => p.name,
  //   subtitle: (p) => p.description,
  //   to: (p) => `/project/${p.id}`,
  // },
];