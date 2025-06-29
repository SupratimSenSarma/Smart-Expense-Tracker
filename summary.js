let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let todayTotal = expenses
  .filter(e => e.date === new Date().toDateString())
  .reduce((sum, e) => sum + e.amount, 0);

document.getElementById("total-amount").textContent = `₹${todayTotal}`;
