const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const message = document.getElementById("message");
const rememberCheckbox = document.getElementById("remember");

const validEmail = "tecnico@dynamo.com";
const validPassword = "123456";

window.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("savedEmail");

  if (savedEmail) {
    emailInput.value = savedEmail;
    rememberCheckbox.checked = true;
  }
});

togglePasswordBtn.addEventListener("click", () => {
  const passwordType = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = passwordType;
  togglePasswordBtn.textContent = passwordType === "password" ? "Mostrar" : "Ocultar";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === "" || password === "") {
    showMessage("Preencha todos os campos para continuar.", "danger");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    showMessage("Informe um e-mail válido.", "danger");
    return;
  }

  if (password.length < 6) {
    showMessage("A senha deve ter pelo menos 6 caracteres.", "warning");
    return;
  }

  if (rememberCheckbox.checked) {
    localStorage.setItem("savedEmail", email);
  } else {
    localStorage.removeItem("savedEmail");
  }

  if (email === validEmail && password === validPassword) {
    showMessage("Acesso liberado. Redirecionando para o painel técnico...", "success");

    setTimeout(() => {
      alert("Login realizado com sucesso.");
    }, 700);

    return;
  }

  showMessage("Credenciais inválidas. Verifique os dados informados.", "danger");
});

function showMessage(text, type) {
  message.textContent = text;

  if (type === "success") {
    message.style.color = "#27c281";
    return;
  }

  if (type === "warning") {
    message.style.color = "#ffb84d";
    return;
  }

  message.style.color = "#ff5d73";
}