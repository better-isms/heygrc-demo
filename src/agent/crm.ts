// Fake connector to the customer's CRM. In the demo it only records writes.

export type CrmChange = { recordId: string; field: "stage" | "next_step" | "owner" | "amount"; value: string };

const writes: CrmChange[] = [];

export const crm = {
  write: async (change: CrmChange) => void writes.push(change),
};
