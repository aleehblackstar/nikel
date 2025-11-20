const myModal = new bootstrap.Modal(document.getElementById("transactionModal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function() {
  window.location.href = "transactions.html"
})

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

  getCashIn();
  getCashOut();
  getTotal();

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

  getCashIn();
  getCashOut();
  getTotal();
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
}

function getCashIn() {
  const transaction = data.transactions;
  const cashIn = transaction.filter((item) => item.type === "1");

  if (cashIn.length) {
    let html = ``;
    let limit = cashIn.length > 5 ? 5 : cashIn.length;

    for (let index = 0; index < limit; index++) {
      html += `
        <div class="row mb-4">
          <div class="col-12">
            <h3 class="fs-2">R$ ${Number(cashIn[index].value).toFixed(2)}</h3>
          </div>
          <div class="container p-0">
            <div class="row">
              <div class="col-12 col-md-8">
                <p>${cashIn[index].description}</p>
              </div>
              <div class="col-12 col-md-3 d-flex justify-content-end">
                ${cashIn[index].date}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    document.getElementById("cash-in-list").innerHTML = html;
  }
}

function getCashOut() {
  const transaction = data.transactions;
  const cashOut = transaction.filter((item) => item.type === "2");

  if (cashOut.length) {
    let html = ``;
    let limit = cashOut.length > 5 ? 5 : cashOut.length;

    for (let index = 0; index < limit; index++) {
      html += `
        <div class="row mb-4">
          <div class="col-12">
            <h3 class="fs-2">R$ ${Number(cashOut[index].value).toFixed(2)}</h3>
          </div>
          <div class="container p-0">
            <div class="row">
              <div class="col-12 col-md-8">
                <p>${cashOut[index].description}</p>
              </div>
              <div class="col-12 col-md-3 d-flex justify-content-end">
                ${cashOut[index].date}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    document.getElementById("cash-out-list").innerHTML = html;
  }
}

function getTotal() {
  const transaction = data.transactions;
  let total = 0;

  transaction.forEach((item) => {
    if (item.type === "1") {
      total += item.value; // ENTRADA
    } else {
      total -= item.value; // SAÍDA
    }
  });

  document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

function saveData(data) {
  localStorage.setItem(logged, JSON.stringify(data));
}
