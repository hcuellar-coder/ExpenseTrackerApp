let expenseForm = [];
let expenseList = [];

document.getElementById("add-expense").addEventListener("click", createExpense);

if (localStorage.getItem('expenses')) {
	document.getElementById("expenses").style.visibility = "visible";
	repopulateExpenses();
}

function repopulateExpenses() {
	let storageList = (JSON.parse(localStorage.getItem("expenses")));
	localStorage.clear();
	for (let i = 0; i < storageList.length; i++) {
		insertExpenseRow(storageList[i].rowID,
			storageList[i].date,
			storageList[i].location,
			storageList[i].description,
			storageList[i].cost);
	}
}

function createExpense() {
	const cost = document.getElementById('expense-cost').value;
	const date = document.getElementById("expense-date").value;
	const location = document.getElementById("expense-location").value;
	const description = document.getElementById("expense-description").value;

	expenseForm.push(date, location, description, cost);

	if (cost === '' || date === '' || location === '' || description === '') {
		alert("Please complete the form before submitting");
	} else if (cost < 0) {
		alert("Cost must be greater than 0!");
	} else {
		document.getElementById("expenses").style.visibility = "visible";
		let rowID = Math.floor(Math.random() * 100);
		insertExpenseRow(rowID, ...expenseForm);
		clearExpense();
	}
}

function insertExpenseRow(rowID, date, location, description, cost) {
	let expenseTable = document.getElementById("expense-table");
	let expenseRow = expenseTable.insertRow();
	expenseRow.id += rowID;

	let cellDate = expenseRow.insertCell(0);
	let cellLocation = expenseRow.insertCell(1);
	let cellDescription = expenseRow.insertCell(2);
	let cellCost = expenseRow.insertCell(3);
	let cellDeleteButton = expenseRow.insertCell(4);

	cellDate.innerHTML = date;
	cellDate.className += 'cell-date';
	cellLocation.innerHTML = location;
	cellLocation.className += 'cell-loc';
	cellDescription.innerHTML = description;
	cellDescription.className += 'cell-desc';
	cellCost.innerHTML = cost;
	cellCost.className += 'cell-cost';

	cellDeleteButton.innerHTML =
		`<button class="del-button">X</button>`;

	expenseRow.addEventListener("click", () => deleteExpense(expenseRow));

	expenseList.push({ rowID, date, location, description, cost });

	localStorage.setItem('expenses', JSON.stringify(expenseList));

	clearExpense();
}

function clearExpense() {
	const inputs = document.querySelectorAll('input');
	inputs.forEach(input => input.value = "");
}

function deleteExpense(expenseRow) {
	expenseRow.remove();

	let deleteIndex = expenseList.indexOf(expenseList.find(row => row.rowID === parseInt(expenseRow.id)));
	expenseList.splice(deleteIndex, 1);

	localStorage.clear();
	localStorage.setItem('expenses', JSON.stringify(expenseList));

	if (!expenseList.length) {
		localStorage.clear();
		document.getElementById("expenses").style.visibility = "hidden";
	} else {
		localStorage.clear();
		localStorage.setItem('expenses', JSON.stringify(expenseList));
	}
}