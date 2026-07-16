import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import incrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Bundle prerendered pages into the Worker's static assets and serve them from there.
// Correct for fully-static sites where we don't need ISR revalidation.
export default defineCloudflareConfig({
  incrementalCache,
});
