import { http, HttpResponse, delay } from "msw";
import { notifications as seed } from "./notifications";

const API = import.meta.env.VITE_API_URL ?? "/api";

let db = structuredClone(seed);

export const handlers = [
  // ---- Read ----
  http.get(`${API}/notifications`, async () => {
    await delay(300);
    return HttpResponse.json(db);
  }),

  http.get(`${API}/notifications/:id`, async ({ params }) => {
    await delay(300);
    const item = db.find((n) => n.id === Number(params.id));
    if (!item) {
      return HttpResponse.json({ message: "Notification not found" }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),

  // ---- Single actions ----
  http.patch(`${API}/notifications/read-all`, () => {
    db = db.map((n) => ({ ...n, read: true }));
    return HttpResponse.json({ updated: db.length });
  }),

  http.patch(`${API}/notifications/:id/read`, ({ params }) => {
    const item = db.find((n) => n.id === Number(params.id));
    if (!item) return HttpResponse.json({ message: "Notification not found" }, { status: 404 });
    item.read = true;
    return HttpResponse.json(item);
  }),

  http.patch(`${API}/notifications/:id/unread`, ({ params }) => {
    const item = db.find((n) => n.id === Number(params.id));
    if (!item) return HttpResponse.json({ message: "Notification not found" }, { status: 404 });
    item.read = false;
    return HttpResponse.json(item);
  }),

  http.delete(`${API}/notifications/:id`, ({ params }) => {
    db = db.filter((n) => n.id !== Number(params.id));
    return new HttpResponse(null, { status: 204 });
  }),

  // ---- Bulk (one request for many ids) ----
  http.post(`${API}/notifications/bulk-read`, async ({ request }) => {
    const { ids } = await request.json();
    const set = new Set(ids);
    db = db.map((n) => (set.has(n.id) ? { ...n, read: true } : n));
    return HttpResponse.json({ updated: ids.length });
  }),

  http.post(`${API}/notifications/bulk-unread`, async ({ request }) => {
    const { ids } = await request.json();
    const set = new Set(ids);
    db = db.map((n) => (set.has(n.id) ? { ...n, read: false } : n));
    return HttpResponse.json({ updated: ids.length });
  }),

  http.post(`${API}/notifications/bulk-delete`, async ({ request }) => {
    const { ids } = await request.json();
    const set = new Set(ids);
    const before = db.length;
    db = db.filter((n) => !set.has(n.id));
    return HttpResponse.json({ deleted: before - db.length });
  }),
];