import t from "https://deno.land/x/netlify_cms_config@v0.3.0/mod.ts";

// Defaults
t.defaultRequired = false;
t.defaults.object.collapsed();
t.defaults.list.collapsed().minimizeCollapsed();
t.defaults.markdown.minimal();

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
      t.string("demo"),
      t.string("calendly_url"),
    ]),
    t.list("Menu", [
      t.string("Text"),
      t.string("Href"),
      t.string("Class"),
    ]),
    t.list("Steps", [
      t.string("Title"),
      t.markdown("Description"),
      t.string("Class"),
      t.image("Img"),
    ]),
    t.markdown("Resume"),
    t.object("Pricing", [
      t.string("Title"),
      t.markdown("Description"),
      t.string("CTA"),
    ]),
    t.object("Demo", [
      t.string("Title"),
      t.markdown("Description"),
      t.string("CTA"),
    ]),
    t.object("FAQ", [
      t.string("Title"),
      t.markdown("Description"),
      t.list("Questions", [
        t.string("Question"),
        t.markdown("Answer"),
      ]),
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
  ])
  .file("Roadmap", "/roadmap.yml", [
    t.string("Title"),
    t.hidden("Layout"),
    t.list("Features", [
      t.string("Title"),
      t.select("State", ["Backlog", "Upcoming", "Building", "Released"]),
      t.markdown("Description"),
    ])
      .summary("[{{fields.state}}] - {{fields.title}}")
      .minimizeCollapsed(false),
  ]);

// Updates
const updates = t.folder("Updates", "updates", [
  t.string("Title"),
  t.string("Author"),
  t.boolean("Draft"),
  t.datetime("Date"),
  t.markdown("Body"),
])
  .description("Here you can edit your updates")
  .preview(false)
  .mediaFolder("/static/img/updates")
  .publicFolder("/img/updates")
  .create(true);

// Posts
const posts = t.folder("Posts", "blog", [
  t.string("Title"),
  t.select("Author", [
    {
      label: "Gustavo Sucre",
      value: "gus",
    },
    {
      label: "David Roch",
      value: "david",
    },
  ]),
  t.boolean("Draft"),
  t.boolean("Show TOC"),
  t.datetime("Date"),
  t.string("URL"),
  t.markdown("Excerpt"),
  t.markdown("Body"),
])
  .description("Here you can edit your posts")
  .preview(false)
  .mediaFolder("/static/img/blog")
  .publicFolder("/img/blog")
  .create(true);

export default {
  backend: {
    name: "git-gateway",
    branch: "master",
  },
  media_folder: "static/img",
  public_folder: "/img",
  collections: [
    pages.toJSON(),
    updates.toJSON(),
    posts.toJSON(),
    data.toJSON(),
  ],
};
