import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import basePath from "lume/plugins/base_path.ts";
import cms from "lume/plugins/netlify_cms.ts";

const site = lume();

site
  .copy([".png", ".svg"])
  .copy("scripts")
  .use(basePath())
  .use(postcss())
  .use(cms({
    previewStyle: "styles/admin.css",
  }))
  .data("dev", site.options.dev)
  .data("cache", Date.now());

export default site;
