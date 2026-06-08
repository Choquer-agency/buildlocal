// CRM state shapes + pipeline definitions for the internal admin.

export interface ActivityEntry {
  ts: string; // ISO
  label: string;
}

export interface CrmRecord {
  status: SalesStatus;
  buildStage: BuildStage;
  dealValue?: number; // monthly or one-time $ behind a won deal
  notes?: string;
  scans: string[]; // ISO timestamps of every QR scan
  themeOverride?: { themeId?: number; accent?: string }; // manual color control
  activity?: ActivityEntry[]; // audit trail
  updatedAt?: string;
}

export type SalesStatus =
  | "new"
  | "mailed"
  | "scanned"
  | "contacted"
  | "no_answer"
  | "quoted"
  | "won"
  | "lost";

export type BuildStage = "template" | "designing" | "customized";

export const SALES_STATUSES: { value: SalesStatus; label: string; color: string; bg: string }[] = [
  { value: "new", label: "New", color: "#6b7280", bg: "#f3f4f6" },
  { value: "mailed", label: "Flyer Mailed", color: "#2563eb", bg: "#dbeafe" },
  { value: "scanned", label: "QR Scanned ⚡", color: "#b45309", bg: "#fef3c7" },
  { value: "contacted", label: "Contacted", color: "#7c3aed", bg: "#ede9fe" },
  { value: "no_answer", label: "No Answer", color: "#ea580c", bg: "#ffedd5" },
  { value: "quoted", label: "Quote Sent", color: "#0d9488", bg: "#ccfbf1" },
  { value: "won", label: "Won", color: "#15803d", bg: "#dcfce7" },
  { value: "lost", label: "Lost", color: "#dc2626", bg: "#fee2e2" },
];

export const BUILD_STAGES: { value: BuildStage; label: string; color: string; bg: string }[] = [
  { value: "template", label: "Template", color: "#6b7280", bg: "#f3f4f6" },
  { value: "designing", label: "Designing", color: "#2563eb", bg: "#dbeafe" },
  { value: "customized", label: "Customized", color: "#15803d", bg: "#dcfce7" },
];

export const DEFAULT_CRM: CrmRecord = { status: "new", buildStage: "template", scans: [], activity: [] };

export function statusMeta(s: SalesStatus) {
  return SALES_STATUSES.find((x) => x.value === s) || SALES_STATUSES[0];
}
export function buildMeta(s: BuildStage) {
  return BUILD_STAGES.find((x) => x.value === s) || BUILD_STAGES[0];
}
