document.getElementById('addExpense').addEventListener('click', createExpense);

let expenseForm = [];

function createExpense() {
    if (validateForm()) {
        insertExpenseRow();
    } else {
        clearExpense();
        alert('Please complete the form before submitting');
    }
}

function insertExpenseRow() {
    let deleteRandom = Math.floor(Math.random() * 100);
    let expenseTable = document.getElementById('expenseTable');
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
    deleteButton.innerHTML = `<input type="button" id="` + deleteRandom + `" value="X">`;
    document.getElementById(deleteRandom).addEventListener('click', function () { deleteExpense(deleteRandom) });

    clearExpense();
}

function deleteExpense(deleteID) {
    document.getElementById(deleteID).parentElement.parentElement.remove();
}

function validateForm() {
    expenseForm.push(document.getElementById('expenseDate').value,
        document.getElementById('expenseLocation').value,
        document.getElementById('expenseDescription').value,
        document.getElementById('expenseCost').value);

    if (!isEmpty(expenseForm)) {
        return true;
    } else {
        return false;
    }
}

function isEmpty(input) {
    for (i = 0; i < input.length; i++) {
        if (!input[i]) {
            return true;
        }
    }
    return false;
}

function clearExpense() {
    if (!isEmpty(expenseForm)) {
        expenseForm = [];
        document.getElementById('expenseDate').value = '';
        document.getElementById('expenseLocation').value = '';
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseCost').value = '';
    } else {
        expenseForm = [];
    }
}
