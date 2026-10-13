// Browser entry point for the shipfast web app (fake: renders strings only).
//
// Analytics are first party only (src/events.ts, activity R-02). Any vendor
// that receives user data must be in docs/compliance/records-of-processing.md.

import type { User } from "../db.js";
import { renderHelpAnswer } from "./helpAnswer.js";

export type Page = "home" | "help" | "settings";

export async function boot(user: User, page: Page) {
  const html: string[] = [`<main data-user="${user.id}">`];
  if (page === "help") html.push(await renderHelpAnswer("How do I invite a teammate?"));
  html.push(`</main>`);
  return html.join("\n");
}
