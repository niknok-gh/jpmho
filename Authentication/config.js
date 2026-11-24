const CONFIG = {
  // Backend
  API_BASE_URL: "http://localhost:3000/api",
  USE_MOCK: true,

  ENDPOINTS: {
    register: "/auth/register",
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
  },

  PAGES: {
    createAccount1: "create-account1.html",
    createAccount2: "create-account2.html",
    signin: "signin.html",
    forgotPassword: "forgot-password.html",
    home: "index.html",
  },

  STORAGE: {
    signupDraft: "mho.signupDraft",
    token: "mho.token",
  },

  MIN_AGE: 18,
  MIN_PASSWORD: 8,
  REDIRECT_DELAY: 1400,
  BLOOD_TYPES: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
};

const VALIDATORS = {
  required: (v) => v.trim() !== "",
  phone: (v) => /^09\d{9}$/.test(v.trim()),
  email: (v) => /^\S+@\S+\.\S+$/.test(v.trim()),
  password: (v) => v.length >= CONFIG.MIN_PASSWORD,
  dob: (v) => {
    if (!v) return false;
    const d = new Date(v),
      n = new Date();
    let age = n.getFullYear() - d.getFullYear();
    const m = n.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && n.getDate() < d.getDate())) age--;
    return age >= CONFIG.MIN_AGE;
  },

  match: (v, el) =>
    v !== "" && v === document.getElementById(el.dataset.match).value,
};
