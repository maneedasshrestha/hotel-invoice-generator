// Selecting necessary elements
const addItemButton = document.getElementById('add-item-btn');
const itemRowsContainer = document.getElementById('item-rows');

// Function to add a new item row
function addItemRow() {
  // Create a new div with class 'item-row'
  const newItemRow = document.createElement('div');
  newItemRow.classList.add('item-row');

  // Create input fields for item, quantity, rate, and amount
  const itemNameInput = document.createElement('input');
  itemNameInput.type = 'text';
  itemNameInput.classList.add('item-name');
  itemNameInput.placeholder = 'Enter item';

  const itemQuantityInput = document.createElement('input');
  itemQuantityInput.type = 'number';
  itemQuantityInput.classList.add('item-quantity');
  itemQuantityInput.placeholder = 'Quantity';

  const itemRateInput = document.createElement('input');
  itemRateInput.type = 'number';
  itemRateInput.classList.add('item-rate');
  itemRateInput.placeholder = 'Rate';

  const itemAmountInput = document.createElement('input');
  itemAmountInput.type = 'number';
  itemAmountInput.classList.add('item-amount');
  itemAmountInput.placeholder = 'Amount';
  itemAmountInput.readOnly = true;

  // Append all inputs to the new item row
  newItemRow.appendChild(itemNameInput);
  newItemRow.appendChild(itemQuantityInput);
  newItemRow.appendChild(itemRateInput);
  newItemRow.appendChild(itemAmountInput);

  // Append the new row to the container
  itemRowsContainer.appendChild(newItemRow);

  // Add event listeners to calculate the amount when quantity or rate is changed
  itemQuantityInput.addEventListener('input', calculateAmount);
  itemRateInput.addEventListener('input', calculateAmount);

  // Function to calculate the amount for the row
  function calculateAmount() {
    const quantity = parseFloat(itemQuantityInput.value) || 0;
    const rate = parseFloat(itemRateInput.value) || 0;
    const amount = quantity * rate;
    itemAmountInput.value = amount.toFixed(2); // Set the calculated amount
    updateTotals(); // Update total after amount change
  }
}

// Function to update totals, payment made, and balance due
function updateTotals() {
  const allAmountInputs = document.querySelectorAll('.item-amount');
  let totalAmount = 0;

  allAmountInputs.forEach(input => {
    totalAmount += parseFloat(input.value) || 0;
  });

  const totalAmountField = document.getElementById('total-amount');
  totalAmountField.value = totalAmount.toFixed(2);

  const paymentMadeField = document.getElementById('payment-made');
  const paymentMade = parseFloat(paymentMadeField.value) || 0;

  const balanceDueField = document.getElementById('balance-due');
  balanceDueField.value = (totalAmount - paymentMade).toFixed(2);
}

// Add event listener to the Add Item button
addItemButton.addEventListener('click', addItemRow);

// Add event listener to payment made field to update balance due
const paymentMadeField = document.getElementById('payment-made');
paymentMadeField.addEventListener('input', updateTotals);
