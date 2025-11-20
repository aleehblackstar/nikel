const myModal = new bootstrap.Modal(document.getElementById("transactionModal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
  transactions: [], // ✅ Corrigido: "transactions" (não "trasactions")
};

document.getElementById("button-logout").addEventListener("click", logout);

// Adiciona as transações
document.getElementById("transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-create-input").value; // ✅ Corrigido o ID
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  // Validação básica
  if (!value || value <= 0) {
    alert("Informe um valor válido!");
    return;
  }

  if (!description) {
    alert("Informe uma descrição!");
    return;
  }

  if (!date) {
    alert("Informe uma data!");
    return;
  }

  // Adiciona a transação
  data.transactions.unshift({
    value: value,
    description: description,
    date: date,
    type: type,
  });

  saveData(data);
  e.target.reset();
  myModal.hide();
  
  alert("Transação adicionada com sucesso!");
  
  // Atualiza a interface (opcional - adicione depois)
  // updateUI();
});

checkLogged();

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
}

function saveData(data) {
  localStorage.setItem(logged, JSON.stringify(data));
}