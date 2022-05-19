import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import basePath from "lume/plugins/base_path.ts";

export default lume()
  .copy([".png", ".svg"])
  .copy("scripts")
  .use(basePath())
  .use(postcss())
  .data("dev", true);
