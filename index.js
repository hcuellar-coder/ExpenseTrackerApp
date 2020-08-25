let expenseForm = [];
let expenseList = [];
let emptyFlag = true;
let costValid = false;

document.getElementById("addExpense").addEventListener("click", createExpense);

if (window.localStorage.getItem('expenses')) {
	document.getElementById("expenses").style.visibility = "visible";
	repopulateExpenses();
}

function repopulateExpenses() {
	let storageList = (JSON.parse(window.localStorage.getItem("expenses")));
	window.localStorage.clear();
	for (let i = 0; i < storageList.length; i++) {
		insertExpenseRow(storageList[i].rowID,
			storageList[i].date,
			storageList[i].location,
			storageList[i].description,
			storageList[i].cost);
	}
}

function createExpense() {
	if (validateForm()) {
		document.getElementById("expenses").style.visibility = "visible";
		let rowID = Math.floor(Math.random() * 100);
		insertExpenseRow(rowID,
			expenseForm[0],
			expenseForm[1],
			expenseForm[2],
			expenseForm[3]);
	} else {
		clearExpense();
	}
}

function validateForm() {
	cost = document.getElementById("expenseCost").value
	expenseForm.push(
		document.getElementById("expenseDate").value,
		document.getElementById("expenseLocation").value,
		document.getElementById("expenseDescription").value,
		cost
	);

	if (!isEmpty(expenseForm) && costCheck(cost)) {
		emptyFlag = false;
		return true;
	} else {
		emptyFlag = true;
		return false;
	}
}

function insertExpenseRow(rowID, date, location, description, cost) {
	let expenseTable = document.getElementById("expenseTable");
	let expenseRow = expenseTable.insertRow();
	expenseRow.id += rowID;

	let cellDate = expenseRow.insertCell(0);
	let cellLocation = expenseRow.insertCell(1);
	let cellDescription = expenseRow.insertCell(2);
	let cellCost = expenseRow.insertCell(3);
	let cellDeleteButton = expenseRow.insertCell(4);

	cellDate.innerHTML = date;
	cellDate.className += 'cellDate';
	cellLocation.innerHTML = location;
	cellLocation.className += 'cellLoc';
	cellDescription.innerHTML = description;
	cellDescription.className += 'cellDesc';
	cellCost.innerHTML = cost;
	cellCost.className += 'cellCost';

	cellDeleteButton.innerHTML =
		`<button class="delButton">X</button>`;

	expenseRow.addEventListener("click", e => {
		if (e.target.type === 'submit') {
			deleteExpense(expenseRow);
		}
	});

	expenseList.push({
		rowID: rowID,
		date: date,
		location: location,
		description: description,
		cost: cost
	});

	window.localStorage.setItem('expenses', JSON.stringify(expenseList));

	clearExpense();
}

function costCheck(cost) {
	if (cost > 0) {
		costValid = true;
		return true;
	} else {
		alert("Cost must be greater than 0!");
		costValid = false;
		return false;
	}
}

function isEmpty(input) {
	for (i = 0; i < input.length; i++) {
		if (!input[i]) {
			alert("Please complete the form before submitting");
			return true;
		}
	}
	return false;
}

function clearExpense() {
	if (!emptyFlag && costValid) {
		expenseForm = [];
		document.getElementById("expenseDate").value = "";
		document.getElementById("expenseLocation").value = "";
		document.getElementById("expenseDescription").value = "";
		document.getElementById("expenseCost").value = "";
	} else {
		expenseForm = [];
	}
}

function deleteExpense(expenseRow) {
	expenseRow.remove();

	let deleteIndex = expenseList.indexOf(expenseList.find(row => row.rowID === parseInt(expenseRow.id)));
	expenseList.splice(deleteIndex, 1);

	window.localStorage.clear();
	window.localStorage.setItem('expenses', JSON.stringify(expenseList));

	if (!expenseList.length) {
		window.localStorage.clear();
		document.getElementById("expenses").style.visibility = "hidden";
	} else {
		window.localStorage.clear();
		window.localStorage.setItem('expenses', JSON.stringify(expenseList));
	}
}