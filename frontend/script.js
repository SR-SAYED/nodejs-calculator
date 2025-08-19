document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calcForm');    // Select the form
  const resultDiv = document.getElementById('result'); // Select result div

  form.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent page reload on submit

    // Get input values
    const num1 = parseFloat(form.num1.value);
    const num2 = parseFloat(form.num2.value);
    const operation = form.operation.value;

    let result;

    // Perform calculation based on operation
    switch(operation) {
      case 'add': 
        result = num1 + num2;
        break;
      case 'sub':
        result = num1 - num2;
        break;
      case 'mul':
        result = num1 * num2;
        break;
      case 'div':
        if (num2 === 0) {
          result = 'Error: Cannot divide by zero';
        } else {
          result = num1 / num2;
        }
        break;
      default:
        result = 'Invalid operation';
    }

    // Display result
    resultDiv.innerHTML = `<h3>Result: ${result}</h3>`;
  });
});
