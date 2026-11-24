/* forgot-password.js — request a password reset link */
const form = document.getElementById("form");

Form.init();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  Form.showError(form, "");
  if (!Form.validate(form)) return;

  Form.setLoading(form, true);
  try {
    await API.forgotPassword({
      email: document.getElementById("email").value.trim(),
    });
    // Same message whether or not the email exists, so accounts can't be guessed
    Form.showSuccess(
      form,
      "If that email is registered, a reset link is on its way.",
      {
        href: CONFIG.PAGES.signin,
        text: "Back to log in",
      },
    );
  } catch (err) {
    Form.showError(form, err.message);
  } finally {
    Form.setLoading(form, false);
  }
});
