const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

// Parse JSON
app.use(bodyParser.json());

// Log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} Body:`, req.body);
  next();
});

// Serve frontend files
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
    default:
      console.log("Invalid operation received:", operation);
      result = "Invalid operation";
  }

  console.log(`Calculation: ${num1} ${operation} ${num2} = ${result}`);
  res.json({ result });
});

// Listen on all interfaces so production server can access
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running at http://0.0.0.0:${PORT}`);
});