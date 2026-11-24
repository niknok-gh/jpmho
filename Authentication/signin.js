/* signin.js — log in with email and password */
const form = document.getElementById("form");

Form.init();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  Form.showError(form, "");
  if (!Form.validate(form)) return;

  const remember = document.getElementById("remember").checked;

  Form.setLoading(form, true);
  try {
    const { token } = await API.login({
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
    });

    // "Remember Me" keeps the session after the browser closes
    const store = remember ? localStorage : sessionStorage;
    store.setItem(CONFIG.STORAGE.token, token);

    Form.showSuccess(form, "Signed in. Redirecting…");
    Form.redirect(CONFIG.PAGES.home);
  } catch (err) {
    Form.showError(form, err.message);
  } finally {
    Form.setLoading(form, false);
  }
});
