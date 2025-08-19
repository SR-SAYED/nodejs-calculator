let firstNum = "";
let operator = "";
let secondNum = "";
let current = "";
const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

const symbolToBackend = { "+": "add", "-": "sub", "*": "mul", "/": "div" };

function updateDisplay() {
  expressionEl.textContent = `${firstNum} ${operator || ""} ${secondNum}`;
  resultEl.textContent = current || "0";
}

// Number & decimal
document.querySelectorAll(".number").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "." && current.includes(".")) return;
    current += btn.textContent;
    if (!operator) firstNum = current;
    else secondNum = current;
    updateDisplay();
  });
});

// Clear
document.querySelector(".clear").addEventListener("click", () => {
  firstNum = "";
  secondNum = "";
  operator = "";
  current = "";
  updateDisplay();
});

// Sign toggle
document.querySelector(".sign").addEventListener("click", () => {
  if (!current) return;
  current = current.startsWith("-") ? current.slice(1) : "-" + current;
  if (!operator) firstNum = current;
  else secondNum = current;
  updateDisplay();
});

// Operators including %, sqrt
document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", async () => {
    const op = btn.dataset.op;

    if (op === "%") {
      current = (parseFloat(current) / 100).toString();
      if (!operator) firstNum = current;
      else secondNum = current;
      updateDisplay();
      return;
    }

    if (op === "sqrt") {
      current = (Math.sqrt(parseFloat(current))).toString();
      if (!operator) firstNum = current;
      else secondNum = current;
      updateDisplay();
      return;
    }

    if (!current) return;
    if (operator && secondNum) await calculate(); // chain calculations

    operator = op;
    current = "";
    updateDisplay();
  });
});

// Equal button
document.querySelector(".equal").addEventListener("click", async () => {
  if (!firstNum || !operator || !secondNum) return;
  await calculate();
});

// Calculate via backend
async function calculate() {
  const num1 = parseFloat(firstNum);
  const num2 = parseFloat(secondNum);
  const backendOp = symbolToBackend[operator];

  try {
    const res = await fetch("/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num1, num2, operation: backendOp })
    });
    const data = await res.json();
    current = data.result.toString();
    firstNum = current;
    secondNum = "";
    operator = "";
    updateDisplay();
  } catch (err) {
    current = "Error";
    updateDisplay();
    console.error(err);
  }
}