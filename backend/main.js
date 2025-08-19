const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// API route
app.post("/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;
  let result;

  switch (operation) {
    case "add": result = num1 + num2; break;
    case "sub": result = num1 - num2; break;
    case "mul": result = num1 * num2; break;
    case "div": result = num2 !== 0 ? num1 / num2 : "Error: Division by zero"; break;
    default: result = "Invalid operation";
  }

  console.log(`Calculation: ${num1} ${operation} ${num2} = ${result}`);
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});