import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import basePath from "lume/plugins/base_path.ts";

export default lume()
  .copy([".svg"])
  .use(basePath())
  .use(postcss());
