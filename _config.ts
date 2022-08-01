import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import cms from "lume/plugins/netlify_cms.ts";
import metas from "lume/plugins/metas.ts";
import date from "lume/plugins/date.ts";

export default lume({
  location: new URL("https://getbadger.io"),
})
  .copy("static", ".")
  .ignore("README.md")
  .use(postcss())
  .use(date())
  .use(metas())
  .use(cms({
    previewStyle: "styles/admin.css",
    netlifyIdentity: true,
  }))
  .data("test", Deno.env.get("ENV") !== "prod")
  .data("cache", Date.now());
