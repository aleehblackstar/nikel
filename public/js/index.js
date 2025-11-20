const myModal = new bootstrap.Modal(document.getElementById("registerModal"));

// ================== VERIFICA SE JÁ ESTÁ LOGADO ==================
checkLogged();

function checkLogged() {
  const logged = sessionStorage.getItem("logged");
  const session = localStorage.getItem("session");

  if (session) {
    sessionStorage.setItem("logged", session);
    window.location.href = "home.html";
    return;
  }

  if (logged) {
    window.location.href = "home.html";
    return;
  }
}

// ================== LOGIN SISTEMA ==================
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();
  const checkSession = document.getElementById("session-check").checked;

  // Validação básica
  if (!email || !password) {
    alert("Preencha e-mail e senha corretamente.");
    return;
  }

  const account = getAccount(email);

  if (!account) {
    alert("Conta inexistente!");
    return;
  }

  if (account.password !== password) {
    alert("Opss! Verifique o usuário e a senha.");
    return;
  }

  
  sessionStorage.setItem("logged", email);


  if (checkSession) {
    localStorage.setItem("session", email);
  }

  // Login bem-sucedido
  alert("Login realizado com sucesso!");
  window.location.href = "home.html";
});

// ================== CRIAR CONTA ==================
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value.trim();
  const password = document
    .getElementById("password-create-input")
    .value.trim();

  // Validação de email e senha
  if (!email) {
    alert("O e-mail é obrigatório!");
    return;
  }

  if (password.length < 5) {
    alert("A senha deve ter no mínimo 5 caracteres.");
    return;
  }

  if (password.length > 40) {
    alert("A senha deve ter no máximo 40 caracteres.");
    return;
  }

  if (getAccount(email)) {
    alert("Já existe uma conta com esse e-mail!");
    return;
  }

  // Salva a conta
  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  // Fecha o modal
  const modalInstance = bootstrap.Modal.getInstance(
    document.getElementById("registerModal")
  );
  if (modalInstance) {
    modalInstance.hide();
  }

  alert("Conta criada com sucesso!");
  
  // Limpa os campos do formulário
  document.getElementById("create-form").reset();
});



function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
};

function getAccount(key) {
  const account = localStorage.getItem(key);
  if (account) {
    return JSON.parse(account);
  }
  return null;
};