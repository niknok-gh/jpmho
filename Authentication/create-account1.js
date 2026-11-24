/* personal details */
const form = document.getElementById('form');
const FIELDS = ['firstName', 'lastName', 'phone', 'dob'];

Form.init();

// Restore earlier answers if the person comes back from step 2
const draft = JSON.parse(sessionStorage.getItem(CONFIG.STORAGE.signupDraft) || '{}');
FIELDS.forEach(id => {
  if (draft[id]) document.getElementById(id).value = draft[id];
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!Form.validate(form)) return;

  // The password is NOT saved; it is entered again on step 2 and sent from there.
  const data = {};
  FIELDS.forEach(id => (data[id] = document.getElementById(id).value.trim()));
  sessionStorage.setItem(CONFIG.STORAGE.signupDraft, JSON.stringify(data));

  location.href = CONFIG.PAGES.createAccount2;
});
