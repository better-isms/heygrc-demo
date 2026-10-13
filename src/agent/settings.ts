// Per-workspace settings for the CRM sync agent. Admins change them in Settings.

export type WorkspaceSettings = { crmAutoApprove: boolean };

const settings = new Map<string, WorkspaceSettings>();

export async function getWorkspaceSettings(workspaceId: string): Promise<WorkspaceSettings> {
  return settings.get(workspaceId) ?? { crmAutoApprove: false };
}

export async function setCrmAutoApprove(workspaceId: string, enabled: boolean) {
  settings.set(workspaceId, { crmAutoApprove: enabled });
}
