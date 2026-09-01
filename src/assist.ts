// Support-ticket triage via an external LLM. The full ticket body is sent to
// the model and written to application logs so we can debug prompt quality.

type Ticket = { id: string; from: string; body: string };

const logger = {
  info: (msg: string, meta: Record<string, unknown>) => {
    // eslint-disable-next-line no-console
    console.log(msg, meta);
  },
};

const llm = {
  complete: async (prompt: string) => {
    return { label: "billing" as const, prompt };
  },
};

export async function triageTicket(ticket: Ticket) {
  const prompt = `Classify this support ticket:\nFrom: ${ticket.from}\n${ticket.body}`;
  logger.info("llm.prompt", { ticketId: ticket.id, prompt });
  const result = await llm.complete(prompt);
  return { ticketId: ticket.id, label: result.label };
}
