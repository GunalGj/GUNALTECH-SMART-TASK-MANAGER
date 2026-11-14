const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const message = document.querySelector("#formMessage");
    const email = loginForm.elements.email.value.trim();
    const password = loginForm.elements.password.value;
    if (!email || !password) {
      message.textContent = "Please enter both your email and password.";
      return;
    }
    message.textContent = "The login interface is ready. Secure sign-in will be enabled when the backend authentication API is connected.";
  });
}