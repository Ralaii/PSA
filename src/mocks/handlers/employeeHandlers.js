import { http, HttpResponse, delay } from "msw";
import { employees as seed } from "../data/employees";

const API = import.meta.env.VITE_API_URL ?? "/api";

const db = structuredClone(seed);

export const employeeHandler = [
  // ---- List (also handles ?q= and ?limit= for search) ----
  http.get(`${API}/employees`, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.trim().toLowerCase();
    const limit = Number(url.searchParams.get("limit")) || undefined;

    let result = db;
    if (q) {
      result = db.filter((e) =>
        `${e.employeeNumber} ${e.name} ${e.email} ${e.position}`
          .toLowerCase()
          .includes(q)
      );
    }
    if (limit) result = result.slice(0, limit);

    return HttpResponse.json(result);
  }),

  // ---- Detail ----
  http.get(`${API}/employees/:id`, async ({ params }) => {
    await delay(300);
    const item = db.find((e) => e.id === Number(params.id));
    if (!item) {
      return HttpResponse.json({ message: "Employee not found" }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),
];