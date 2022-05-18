const target = "https://hooks.zapier.com/hooks/catch/12547715/bf6gciw/";

class Subscribe extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector("form");
    const inputs = form.querySelectorAll(".input");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => input.classList.add("is-dirty"));
    });
    form.addEventListener("submit", async (e) => {
      inputs.forEach((input) => input.classList.add("is-dirty"));

      e.preventDefault();

      const email = form.email.value;

      if (!email) {
        return;
      }

      try {
        await fetch(target, {
          method: "POST",
          body: JSON.stringify({
            email,
            date: new Date().toUTCString(),
            location: document.location.href,
          }),
        });

        this.showTemplate(".tmpl-success");
      } catch {
        this.showTemplate(".tmpl-error");
      }
    });
  }

  showTemplate(selector) {
    const tmpl = this.querySelector(selector);
    this.innerHTML = "";
    this.appendChild(tmpl.content.cloneNode(true));
  }
}

customElements.define("badger-subscribe", Subscribe);
