let firstNum = "";
let operator = "";
let secondNum = "";
let current = "";
const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

// Map operator symbols to backend strings
const symbolToBackend = { "+": "add", "-": "sub", "*": "mul", "/": "div" };

// History log
let history = [];

// Update display
function updateDisplay() {
  expressionEl.textContent = `${firstNum} ${operator || ""} ${secondNum}`;
  resultEl.textContent = current || "0";
}

// Number & decimal buttons
document.querySelectorAll(".number").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "." && current.includes(".")) return;
    current += btn.textContent;
    if (!operator) firstNum = current;
    else secondNum = current;
    updateDisplay();
  });
});

// Clear button
document.querySelector(".clear").addEventListener("click", () => {
  firstNum = "";
  secondNum = "";
  operator = "";
  current = "";
  updateDisplay();
});

// Sign toggle (+/-)
document.querySelector(".sign").addEventListener("click", () => {
  if (!current) return;
  current = current.startsWith("-") ? current.slice(1) : "-" + current;
  if (!operator) firstNum = current;
  else secondNum = current;
  updateDisplay();
});

// Operator buttons including %, sqrt
document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", async () => {
    const op = btn.dataset.op;

    // Percentage
    if (op === "%") {
      current = (parseFloat(current) / 100).toString();
      if (!operator) firstNum = current;
      else secondNum = current;
      updateDisplay();
      return;
    }

    // Square root
    if (op === "sqrt") {
      current = (Math.sqrt(parseFloat(current))).toString();
      if (!operator) firstNum = current;
      else secondNum = current;
      updateDisplay();
      return;
    }

    if (!current) return;

    // Chain calculations if previous operator exists
    if (operator && secondNum) await calculate();

    operator = op;
    current = "";
    updateDisplay();
  });
});

// Equal button
document.querySelector(".equal").addEventListener("click", async () => {
  if (!firstNum || !operator) return;
  if (!secondNum) secondNum = current;
  if (!secondNum) {
    current = "Error: missing number";
    updateDisplay();
    return;
  }
  await calculate();
});

// Calculate via backend
async function calculate() {
  const num1 = parseFloat(firstNum);
  const num2 = parseFloat(secondNum);
  const backendOp = symbolToBackend[operator];

  if (!backendOp) {
    current = "Error: Invalid operation";
    updateDisplay();
    return;
  }

  try {
    // Detect environment: local vs production
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const BASE_URL = isLocal ? "http://localhost:8000" : window.location.origin + "/calculator";

    console.log("Sending calculation to backend:", { num1, num2, operation: backendOp, BASE_URL });

    const res = await fetch(`${BASE_URL}/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num1, num2, operation: backendOp })
    });

    if (!res.ok) throw new Error(`Backend returned status ${res.status}`);

    const data = await res.json();
    current = data.result.toString();

    // Log calculation
    const calcLog = `${num1} ${operator} ${num2} = ${current}`;
    console.log("Calculation performed:", calcLog);
    history.push(calcLog);

    // Reset for next operation
    firstNum = current;
    secondNum = "";
    operator = "";
    updateDisplay();

  } catch (err) {
    current = "Error";
    updateDisplay();
    console.error("Backend calculation failed:", err);
  }
}