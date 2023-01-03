import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import cms from "lume/plugins/netlify_cms.ts";
import metas from "lume/plugins/metas.ts";
import date from "lume/plugins/date.ts";

export default lume({
  location: new URL("https://getbadger.io"),
}, {
  search: { returnPageData: true },
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
  .data("cache", Date.now())
  .preprocess([".md"], (page) => {
    const content = page.data.content as string;
    // Search the first markdown image and use it as metas.image
    const match = content.match(/\!\[.*\]\(([^\s]+)[^\)]*\)/);

    if (match) {
      page.data.metas!.image = match[1];
    }
  });
