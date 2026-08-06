import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Cached prospect intel (SE Ranking pull) for one business.
export const get = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) =>
    ctx.db.query("intel").withIndex("by_slug", (q) => q.eq("slug", slug)).unique(),
});

// Upsert a freshly-built intel payload.
export const set = mutation({
  args: { slug: v.string(), fetchedAt: v.string(), payload: v.any() },
  handler: async (ctx, { slug, fetchedAt, payload }) => {
    const existing = await ctx.db
      .query("intel")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { fetchedAt, payload });
      return { ...existing, fetchedAt, payload };
    }
    const doc = { slug, fetchedAt, payload };
    await ctx.db.insert("intel", doc);
    return doc;
  },
});
