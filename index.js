document.getElementById("addExpense").addEventListener("click", createExpense);
document.getElementById("expenses").style.visibility = "hidden";

let expenseForm = [];
let emptyFlag = true;
let costValid = false;

function createExpense() {
	if (validateForm()) {
		document.getElementById("expenses").style.visibility = "visible";
		insertExpenseRow();
	} else {
		clearExpense();
	}
}

function insertExpenseRow() {
	let deleteRandom = Math.floor(Math.random() * 100);
	let expenseTable = document.getElementById("expenseTable");
	let expenseRow = expenseTable.insertRow();

	let date = expenseRow.insertCell(0);
	let location = expenseRow.insertCell(1);
	let description = expenseRow.insertCell(2);
	let cost = expenseRow.insertCell(3);
	let deleteButton = expenseRow.insertCell(4);

	date.innerHTML = expenseForm[0];
	location.innerHTML = expenseForm[1];
	description.innerHTML = expenseForm[2];
	cost.innerHTML = expenseForm[3];

	deleteButton.innerHTML =
		`<input type="button" id="` + deleteRandom + `" value="X">`;
	document.getElementById(deleteRandom).addEventListener("click", function() {
		deleteExpense(deleteRandom);
	});

	clearExpense();
}

function deleteExpense(deleteID) {
	document.getElementById(deleteID).parentElement.parentElement.remove();
}

function validateForm() {
	cost = document.getElementById("expenseCost").value
	expenseForm.push(
		document.getElementById("expenseDate").value,
		document.getElementById("expenseLocation").value,
		document.getElementById("expenseDescription").value,
		cost
	);
	console.log('validating');
	if (!isEmpty(expenseForm) && costCheck(cost)) {
		emptyFlag = false;
		return true;
	} else {
		emptyFlag = true;
		return false;
	}
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