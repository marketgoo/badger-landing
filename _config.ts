import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import cms from "lume/plugins/netlify_cms.ts";

export default lume()
  .copy("static", ".")
  .use(postcss())
  .ignore("README.md")
  .use(cms({
    previewStyle: "styles/admin.css",
    netlifyIdentity: true,
  }))
  // Show the Posthog code (POSTHOG=prod to remove the test flag)
  .data(
    "posthog",
    Deno.env.get("POSTHOG") === "prod" ? "prod" : !!Deno.env.get("POSTHOG"),
  )
  .data("cache", Date.now());
