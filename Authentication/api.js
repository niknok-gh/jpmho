const API = (() => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function mock(path, body) {
    await wait(900);
    if (path === CONFIG.ENDPOINTS.login)
      return { token: "mock-token", user: { email: body.email } };
    return { ok: true };
  }

  async function post(path, body) {
    if (CONFIG.USE_MOCK) return mock(path, body);
    let res;
    try {
      res = await fetch(CONFIG.API_BASE_URL + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      throw new Error(
        "Cannot reach the server. Check your connection and try again.",
      );
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok)
      throw new Error(
        data.message || "Something went wrong. Please try again.",
      );
    return data;
  }

  return {
    register: (data) => post(CONFIG.ENDPOINTS.register, data),
    login: (data) => post(CONFIG.ENDPOINTS.login, data),
    forgotPassword: (data) => post(CONFIG.ENDPOINTS.forgotPassword, data),
  };
})();

const Form = {
  EYE: '<svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',

  init() {
    document.querySelectorAll(".toggle-pw").forEach((btn) => {
      btn.innerHTML = Form.EYE;
      btn.addEventListener("click", () => {
        const input = document.getElementById(btn.dataset.toggle);
        const reveal = input.type === "password";
        input.type = reveal ? "text" : "password";
        btn.setAttribute(
          "aria-label",
          reveal ? "Hide password" : "Show password",
        );
      });
    });
    document.addEventListener("input", (e) => {
      const f = e.target.closest(".field");
      if (f) f.classList.remove("invalid", "shake");
    });
  },

  validate(form) {
    let ok = true;
    form.querySelectorAll("[data-rule]").forEach((el) => {
      const good = VALIDATORS[el.dataset.rule](el.value, el);
      const field = el.closest(".field");
      field.classList.remove("shake");
      field.classList.toggle("invalid", !good);
      if (!good) {
        void field.offsetWidth;
        field.classList.add("shake");
        if (ok) el.focus();
      }
      ok = ok && good;
    });
    return ok;
  },

  setLoading(form, loading) {
    form.querySelector(".btn").classList.toggle("loading", loading);
  },

  showError(form, message) {
    const p = form.querySelector(".form-error");
    p.textContent = message;
    p.hidden = !message;
  },

  showSuccess(form, message, link) {
    form.hidden = true;
    document.getElementById("successMsg").textContent = message;
    if (link) {
      const a = document.getElementById("successLink");
      a.href = link.href;
      a.textContent = link.text;
      a.hidden = false;
    }
    document.getElementById("success").hidden = false;
  },

  redirect(url) {
    setTimeout(() => (location.href = url), CONFIG.REDIRECT_DELAY);
  },
};
