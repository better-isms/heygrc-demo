// Synthetic in-memory data layer. Not a real database.

export type User = { id: string; role: "member" | "admin" };
export type Project = { id: string; ownerId: string };
export type EventRow = { type: string; userId: string; at: number };

const users = new Map<string, User>();
const projects = new Map<string, Project>();
const events: EventRow[] = [];

export const db = {
  users: {
    get: async (id: string) => users.get(id),
    set: async (u: User) => void users.set(u.id, u),
  },
  projects: {
    get: async (id: string) => projects.get(id),
    delete: async (id: string) => void projects.delete(id),
  },
  events: {
    insert: async (row: EventRow) => void events.push(row),
  },
};
