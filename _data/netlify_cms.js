const config = {
  backend: {
    name: "git-gateway",
    branch: "master",
  },
  media_folder: "static/img",
  collections: [],
};

// Individual pages
config.collections.push({
  label: "Pages",
  name: "pages",
  description: "Here you can edit your individual pages",
  sortable_fields: ["title"],
  preview: false,
  files: [
    {
      label: "Landing",
      name: "landing",
      file: "/index.yml",
      fields: [
        field("Title"),
        field("layout", "hidden"),
        field("Header", "object", {
          fields: [
            field("Title"),
            field("Intro", "markdown"),
            field("CTA"),
          ],
        }),
        metasFields(),
        field("Menu", "list", {
          fields: [
            field("Text"),
            field("Href"),
          ],
        }),
        field("Steps", "list", {
          fields: [
            field("Title"),
            field("Description", "markdown"),
            field("Class"),
            field("Img", "image"),
          ],
        }),
        field("Resume", "markdown"),
        field("Join", "object", {
          fields: [
            field("Title"),
            field("Description", "markdown"),
            field("Email", "object", {
              fields: [
                field("Label"),
                field("Placeholder"),
              ],
            }),
            field("CTA"),
            field("Success", "markdown"),
            field("Error", "markdown"),
          ],
        }),
      ],
    },
    {
      label: "Privacy policy",
      name: "privacy",
      file: "/privacy.md",
      fields: textPagesFields(),
    },
    {
      label: "Terms of service",
      name: "terms",
      file: "/terms.md",
      fields: textPagesFields(),
    },
    {
      label: "Cookies",
      name: "cookies",
      file: "/cookies.md",
      fields: textPagesFields(),
    },
  ],
});

// Global data
config.collections.push({
  label: "Global data",
  name: "global",
  description: "Edit global data shared by all pages",
  preview: false,
  files: [
    {
      label: "Footer",
      name: "footer",
      file: "/_data/footer.yml",
      fields: [
        field("Copyright"),
        field("Links", "list", {
          fields: [
            field("Text"),
            field("Href"),
          ],
        }),
        field("Cookies", "object", {
          fields: [
            field("Text", "markdown"),
            field("Button"),
          ],
        }),
      ],
    },
  ],
});

function textPagesFields() {
  return [
    field("Title"),
    field("Url"),
    metasFields(),
    field("Body", "markdown"),
  ];
}

function metasFields() {
  return field("Metas", "object", {
    fields: [
      field("Title", { required: false }),
      field("Description", { required: false }),
      field("Image", "image", { required: false }),
      field("Robots", "boolean", { required: false, default: true }),
    ],
  });
}

function field(label, widget = "string", extra = {}) {
  const defaults = {};

  if (typeof widget === "object") {
    extra = widget;
    widget = "string";
  }

  if (widget === "list") {
    defaults.collapsed = true;
    defaults.minimize_collapsed = true;
  } else if (widget === "object") {
    defaults.collapsed = true;
  } else if (widget === "markdown") {
    defaults.minimal = true;
  } else if (widget === "select" || widget === "boolean") {
    defaults.required = false;
  }

  return {
    label,
    name: label.toLowerCase().replaceAll(" ", "_"),
    widget,
    ...defaults,
    ...extra,
  };
}

export default config;
