const config = {
  backend: {
    name: "git-gateway",
    branch: "master",
  },
  media_folder: "img",
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
    }
  ],
});

function textPagesFields() {
  return [
    field("Title"),
    field("Url"),
    field("Body", "markdown"),
  ];
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
