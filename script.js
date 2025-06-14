'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentUser, timer;
let balance = 0;
let time = 300;
let sorted = false;

const sum = nums => nums.reduce((acc, num) => acc + num, 0);

const sort = function (movements) {
  const sortedMovements = [...movements];
  for (let i = 0; i < movements.length; i++) {
    for (let j = i; j > 0; j--) {
      if (sortedMovements[j] < sortedMovements[j - 1])
        [sortedMovements[j], sortedMovements[j - 1]] = [
          sortedMovements[j - 1],
          sortedMovements[j],
        ];
    }
  }
  return sortedMovements;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov} €</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = function (movements) {
  balance = sum(movements);
  labelBalance.textContent = balance + ' €';
};

const displayDeposit = function (movements) {
  labelSumIn.textContent = sum(movements.filter(mov => mov > 0)) + ' €';
};

const displayWithdrawl = function (movements) {
  labelSumOut.textContent =
    Math.abs(sum(movements.filter(mov => mov < 0))) + ' €';
};

const displayInterest = function (account) {
  labelSumInterest.textContent =
    (sum(account.movements) * account.interestRate) / 100 + ' €';
};

const displayTime = function (time) {
  const minutes = Math.trunc(time / 60);
  labelTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(
    time - minutes * 60
  ).padStart(2, '0')}`;
};

const displayDate = function () {
  const date = new Date();
  labelDate.textContent = `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth()
  ).padStart(2, '0')}/${date.getFullYear()}, ${date.getHours()}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
};

const displayGreeting = function (account) {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) {
    greeting = 'Morning';
  } else if (hour >= 12 && hour <= 16) {
    greeting = 'Afternoon';
  } else {
    greeting = 'Evening';
  }
  labelWelcome.textContent = `Good ${greeting}, ${
    account.owner.split(' ')[0]
  }!`;
};

const displayAccount = function (account, time) {
  displayGreeting(account);
  sorted
    ? displayMovements(sort(currentUser.movements))
    : displayMovements(currentUser.movements);
  displayBalance(account.movements);
  displayDeposit(account.movements);
  displayWithdrawl(account.movements);
  displayInterest(account);
  displayTime(time);
  displayDate();
};

const closeAccount = function () {
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
  currentUser = null;
  window.clearInterval(timer);
  time = 300;
};

btnLogin.addEventListener('click', function () {
  accounts.forEach(function (acc) {
    if (
      acc.username === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value)
    ) {
      containerApp.style.opacity = 1;
      currentUser = acc;
      displayAccount(currentUser, time);
      inputLoginUsername.value = '';
      inputLoginPin.value = '';
      timer = window.setInterval(function () {
        time--;
        displayTime(time);
        if (time == 0) closeAccount();
      }, 1000);
    }
  });
});

btnTransfer.addEventListener('click', function () {
  const transferUsername = inputTransferTo.value;
  const transerAmount = Number(inputTransferAmount.value);

  accounts.forEach(function (acc) {
    if (
      acc.username != currentUser.username &&
      acc.username === transferUsername &&
      transerAmount <= balance
    ) {
      acc.movements.push(transerAmount);
      currentUser.movements.push(-1 * transerAmount);
      inputTransferTo.value = '';
      inputTransferAmount.value = '';
    }
  });
  displayAccount(currentUser, time);
});

btnLoan.addEventListener('click', function () {
  const loanAmount = Number(inputLoanAmount.value);
  if (loanAmount > 0) {
    currentUser.movements.push(loanAmount);
    inputLoanAmount.value = '';
  }
  displayAccount(currentUser, time);
});

btnClose.addEventListener('click', function () {
  if (
    currentUser.username === inputCloseUsername.value &&
    currentUser.pin === Number(inputClosePin.value)
  ) {
    closeAccount();
    accounts.forEach((account, index) => {
      if (account.username == currentUser.username) accounts.splice(index, 1);
    });
    inputCloseUsername.value = '';
    inputClosePin.value = '';
  }
});

btnSort.addEventListener('click', function () {
  sorted
    ? displayMovements(currentUser.movements)
    : displayMovements(sort(currentUser.movements));
  sorted = !sorted;
});

createUsernames(accounts);
