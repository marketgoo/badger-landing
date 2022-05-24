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
  .data("environment", Deno.env.get("ENV") === "prod" ? "prod" : "dev")
  .data("cache", Date.now());
