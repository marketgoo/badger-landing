import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import cms from "lume/plugins/netlify_cms.ts";
import metas from "lume/plugins/metas.ts";
import date from "lume/plugins/date.ts";
import inline from "lume/plugins/inline.ts";
import md_image from "https://deno.land/x/lume_markdown_plugins@v0.4.0/image.ts";
import md_toc from "https://deno.land/x/lume_markdown_plugins@v0.4.0/toc.ts";
import vento from "lume/plugins/vento.ts";

export default lume({
  location: new URL("https://getbadger.io"),
}, {
  search: { returnPageData: true },
})
  .copy("static", ".")
  .ignore("README.md")
  .use(md_image())
  .use(md_toc())
  .use(postcss())
  .use(date())
  .use(metas())
  .use(inline())
  .use(vento())
  .use(cms({
    previewStyle: "styles/admin.css",
    netlifyIdentity: true,
  }))
  .data("test", Deno.env.get("ENV") !== "prod")
  .data("cache", Date.now());
