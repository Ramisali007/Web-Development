const accountForm = document.getElementById('account-form');
const rollNumberInput = document.getElementById('roll-number');
const accountDetails = document.getElementById('account-details');
const accountNumberDisplay = document.getElementById('account-number');
const balanceDisplay = document.getElementById('balance');
const transactionHistory = document.getElementById('transaction-history');
const amountInput = document.getElementById('amount');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const downloadBtn = document.getElementById('download-btn');

let account = null;

const extractRollNumber = (rollNumber) => {
    const match = rollNumber.match(/-(\d+)$/);
    return match ? Number(match[1]) : null;
};

const generateAccountNumber = (rollNumber) => `ACC${rollNumber}`;

const generateInitialDeposit = (rollNumber) => {
    const lastDigit = Number(String(rollNumber).slice(-1));
    return lastDigit * 1000;
};

const createAccount = (rawRollNumber) => {
    const rollNumber = extractRollNumber(rawRollNumber);
    if (!rollNumber) {
        alert("Invalid roll number format! Please enter in the format 22f-3703.");
        return;
    }

    const accountNumber = generateAccountNumber(rollNumber);
    const initialDeposit = generateInitialDeposit(rollNumber);
    account = {
        accountNumber,
        balance: initialDeposit,
        transactions: [{ type: 'Initial Deposit', amount: initialDeposit }],
        rollNumber
    };

    accountDetails.classList.remove('hidden');
    accountNumberDisplay.textContent = account.accountNumber;
    updateBalance();
    renderTransactions();
};

const updateBalance = () => {
    balanceDisplay.textContent = account.balance;
};

const renderTransactions = () => {
    transactionHistory.innerHTML = account.transactions
        .map(transaction => `<li><strong>${transaction.type}:</strong> ${transaction.amount} PKR</li>`)
        .join('');
};

const deposit = (amount) => {
    if (amount % account.rollNumber !== 0) {
        alert(`Deposit must be a multiple of ${account.rollNumber}`);
        return;
    }
    account.balance += amount;
    account.transactions.push({ type: 'Deposit', amount });
    updateBalance();
    renderTransactions();
};

const withdraw = (amount) => {
    const maxWithdrawal = account.balance * 0.8;
    if (amount > maxWithdrawal) {
        alert(`Withdrawal limit exceeded. Maximum allowed: ${maxWithdrawal} PKR`);
        return;
    }
    account.balance -= amount;
    account.transactions.push({ type: 'Withdrawal', amount });
    updateBalance();
    renderTransactions();
};

const downloadTransactionHistory = () => {
    const history = account.transactions
        .map(transaction => `${transaction.type}: ${transaction.amount} PKR`)
        .join('\n');
    const blob = new Blob([history], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction_history.txt';
    a.click();
    URL.revokeObjectURL(url);
};

accountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rollNumber = rollNumberInput.value.trim();
    if (!rollNumber) return;
    createAccount(rollNumber);
    rollNumberInput.value = '';
});

depositBtn.addEventListener('click', () => {
    const amount = Number(amountInput.value.trim());
    if (!amount) return;
    deposit(amount);
    amountInput.value = '';
});

withdrawBtn.addEventListener('click', () => {
    const amount = Number(amountInput.value.trim());
    if (!amount) return;
    withdraw(amount);
    amountInput.value = '';
});

downloadBtn.addEventListener('click', downloadTransactionHistory);
