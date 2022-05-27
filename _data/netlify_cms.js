import t from "https://deno.land/x/netlify_cms_config@v0.1.0/mod.ts";

// Defaults
t.defaultRequired = false;
t.defaults.object.collapsed = true;
t.defaults.list.collapsed = true;
t.defaults.list.minimize_collapsed = true;
t.defaults.markdown.minimal = true;

const metas = t.object("Metas", [
  t.string("Title"),
  t.string("Description"),
  t.image("Image"),
  t.boolean("Robots").default(true),
]);

const textPages = [
  t.string("Title"),
  t.string("Url"),
  metas,
  t.markdown("Body"),
];

const pages = t.files("Pages")
  .description("Here you can edit your individual pages")
  .sortableFields("title")
  .preview(false)
  .file("Landing", "/index.yml", [
    t.string("Title"),
    t.hidden("Layout"),
    metas,
    t.object("Header", [
      t.string("Title"),
      t.markdown("Intro"),
      t.string("CTA"),
    ]),
    t.list("Menu", [
      t.string("Text"),
      t.string("Href"),
    ]),
    t.list("Steps", [
      t.string("Title"),
      t.markdown("Description"),
      t.string("Class"),
      t.image("Img"),
    ]),
    t.markdown("Resume"),
    t.object("Join", [
      t.string("Title"),
      t.markdown("Description"),
      t.object("Email", [
        t.string("Label"),
        t.string("Placeholder"),
      ]),
      t.string("CTA"),
      t.markdown("Success"),
      t.markdown("Error"),
    ]),
  ])
  .file("Privacy policy", "/privacy.md", textPages)
  .file("Terms of service", "/terms.md", textPages)
  .file("Cookies", "/cookies.md", textPages);

// Global data
const data = t.files("Global data")
  .description("Edit global data shared by all pages")
  .preview(false)
  .file("Footer", "/_data/footer.yml", [
    t.string("Copyright"),
    t.list("Links", [
      t.string("Text"),
      t.string("Href"),
    ]),
    t.object("Cookies", [
      t.markdown("Text"),
      t.string("Button"),
    ]),
  ]);

export default {
  backend: {
    name: "git-gateway",
    branch: "master",
  },
  media_folder: "static/img",
  collections: [
    pages.toJSON(),
    data.toJSON(),
  ],
};
