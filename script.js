// Typewriter
const introText = "WELCOME TO SMART EXPENSE TRACKER";
const introElem = document.getElementById("intro-text");
let idx = 0;

function typeWriter() {
  if (idx < introText.length) {
    introElem.textContent += introText[idx];
    idx++;
    setTimeout(typeWriter, 80);
  } else {
    setTimeout(() => {
      const intro = document.getElementById("intro");
      intro.classList.add("slide-up");

      // reveal app while intro slides up
      const app = document.getElementById("app");
      app.classList.add("show");

      setTimeout(() => {
        intro.classList.add("hidden");
      }, 1000);
    }, 1000);
  }
}
window.addEventListener("load", typeWriter);

// clock
function updateClock() {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);

// theme toggle
const toggleBtn = document.getElementById("toggle-mode");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    themeLabel.textContent = "Light";
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    themeLabel.textContent = "Dark";
  }
});

// expense logic
const form = document.getElementById("expense-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const viewSummaryBtn = document.getElementById("view-summary");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((exp, idx) => {
    const li = document.createElement("li");
    li.textContent = `${exp.desc} - ₹${exp.amount} [${exp.category}]`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => {
      expenses.splice(idx, 1);
      updateStorage();
    };
    li.appendChild(delBtn);
    expenseList.appendChild(li);
  });
}
function updateStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newExp = {
    desc: descInput.value,
    amount: +amountInput.value,
    category: categoryInput.value,
    date: new Date().toDateString(),
  };
  expenses.push(newExp);
  updateStorage();
  form.reset();
});
viewSummaryBtn.addEventListener("click", () => {
  window.location.href = "summary.html";
});
renderExpenses();
