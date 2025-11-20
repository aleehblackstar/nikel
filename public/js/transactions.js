const myModal = new bootstrap.Modal(document.getElementById("transactionModal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: []
};

// Event listeners
document.querySelector(".dropdown-item").addEventListener("click", logout);

// Adicionar transações
document.getElementById("transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-create-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

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

  data.transactions.unshift({
    value,
    description,
    date,
    type,
  });

  saveData(data);
  e.target.reset();
  myModal.hide();

  loadTransactions();

  alert("Transação adicionada com sucesso!");
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

  loadTransactions();
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
}

function loadTransactions() {
  const tbody = document.querySelector("table tbody");
  
  if (!data.transactions.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">Nenhuma transação cadastrada</td></tr>';
    return;
  }

  let html = '';
  
  data.transactions.forEach((transaction) => {
    const typeLabel = transaction.type === "1" ? "Entrada" : "Saída";
    const typeClass = transaction.type === "1" ? "text-success" : "text-danger";
    
    html += `
      <tr>
        <th scope="row">${transaction.date}</th>
        <td>R$ ${Number(transaction.value).toFixed(2)}</td>
        <td class="${typeClass}">${typeLabel}</td>
        <td>${transaction.description}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function saveData(data) {
  localStorage.setItem(logged, JSON.stringify(data));
}