/* create-account2.js — step 2: blood type, email, password */
const form = document.getElementById("form");

Form.init();

// Step 1 must be finished first
const draft = JSON.parse(
  sessionStorage.getItem(CONFIG.STORAGE.signupDraft) || "null",
);
if (!draft) location.replace(CONFIG.PAGES.createAccount1);

// Fill the blood type list from config
const blood = document.getElementById("blood");
blood.innerHTML =
  '<option value="">Select your blood type</option>' +
  CONFIG.BLOOD_TYPES.map((t) => `<option value="${t}">${t}</option>`).join("");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  Form.showError(form, "");
  if (!Form.validate(form)) return;

  const payload = {
    ...draft,
    bloodType: blood.value,
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("pw2").value,
    remember: document.getElementById("remember").checked,
  };

  Form.setLoading(form, true);
  try {
    await API.register(payload);
    sessionStorage.removeItem(CONFIG.STORAGE.signupDraft);
    Form.showSuccess(form, "Account created. You can now log in.", {
      href: CONFIG.PAGES.signin,
      text: "Continue to log in",
    });
    Form.redirect(CONFIG.PAGES.signin);
  } catch (err) {
    Form.showError(form, err.message);
  } finally {
    Form.setLoading(form, false);
  }
});
