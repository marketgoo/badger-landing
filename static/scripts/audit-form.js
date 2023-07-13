class AuditForm extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector("form");
    const successTemplate = this.querySelector("#auditform-success");
    const errorTemplate = this.querySelector("#auditform-error");
    
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Send form data to server
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      if (!response.ok) {
        // Show error message
        const error = errorTemplate.content.cloneNode(true);
        form.replaceWith(error);
        return;
      }
      
      // Show success message
      const data = await response.json();
      const success = successTemplate.content.cloneNode(true);
      success.querySelector("a.button").setAttribute("href", data.audit_url);
      form.replaceWith(success);
    });
  }
}

customElements.define("badger-auditform", AuditForm);
