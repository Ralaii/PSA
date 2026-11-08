import { setupWorker } from "msw/browser";
import { notificationHandler } from "./handlers/notificationHandler";
import { employeeHandler } from "./handlers/employeeHandlers"

export const worker = setupWorker(...notificationHandler, ...employeeHandler);