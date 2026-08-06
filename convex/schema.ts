import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// One row per business (keyed by slug). Mirrors CrmRecord in src/lib/crm-types.ts.
export default defineSchema({
  crm: defineTable({
    slug: v.string(),
    status: v.string(),
    buildStage: v.string(),
    dealValue: v.optional(v.number()),
    notes: v.optional(v.string()),
    scans: v.array(v.string()),
    themeOverride: v.optional(
      v.object({ themeId: v.optional(v.number()), accent: v.optional(v.string()) })
    ),
    activity: v.optional(v.array(v.object({ ts: v.string(), label: v.string() }))),
    updatedAt: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  // Cached SE Ranking intel per business (keyed by slug). Written by
  // /api/intel, read by the /admin/prospect/[slug] call-prep page.
  intel: defineTable({
    slug: v.string(),
    fetchedAt: v.string(),
    // The whole ProspectIntel payload (see src/lib/prospect-intel.ts). Stored
    // opaquely so the report shape can evolve without a schema migration.
    payload: v.any(),
  }).index("by_slug", ["slug"]),
});
