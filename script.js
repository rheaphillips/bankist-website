'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 486.69, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2025-05-12T10:51:36.790Z',
    '2025-06-20T10:51:36.790Z',
    '2025-06-23T21:31:17.178Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2021-02-14T11:23:45.678Z',
    '2021-03-30T09:12:01.234Z',
    '2021-06-05T16:44:33.987Z',
    '2021-08-20T08:10:22.543Z',
    '2021-09-14T19:55:14.120Z',
    '2021-10-29T21:03:47.876Z',
    '2021-12-01T13:37:29.300Z',
    '2021-12-15T07:18:56.432Z',
  ],

  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2018-03-15T10:22:31.456Z',
    '2019-07-08T14:49:12.789Z',
    '2020-11-02T09:17:55.321Z',
    '2021-01-19T18:33:47.654Z',
    '2022-04-27T07:28:11.908Z',
    '2023-06-10T12:41:33.120Z',
    '2024-09-05T20:03:22.444Z',
    '2025-02-12T06:14:59.678Z',
  ],

  currency: 'EUR',
  locale: 'pt-PT', // de-DE
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

let currentUser,
  timer,
  interest = 0,
  time = 300,
  sorted = false;

const sum = nums => nums.reduce((acc, num) => acc + num, 0);

const createUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const formatDate = locale =>
  (labelDate.textContent = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'short',
  }).format(new Date()));

const formatMovementDate = function (date, locale) {
  const daysSince = Math.floor(
    (new Date() - new Date(date)) / (24 * 60 * 60 * 1000)
  );
  if (daysSince === 0) return 'Today';
  if (daysSince === 1) return 'Yesterday';
  if (daysSince <= 7) return `${daysSince} days ago`;
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

const formatMoney = (value, currency, locale) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value.toFixed(2));

const displayMovements = function (account) {
  containerMovements.innerHTML = '';

  let movementsData = account.movements.map((mov, i) => ({
    mov,
    date: account.movementsDates[i],
  }));
  if (sorted) movementsData = movementsData.sort((a, b) => a.mov - b.mov);

  movementsData.forEach(function (data, i) {
    const { mov, date } = data;
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${formatMovementDate(
          date,
          account.locale
        )}</div>
        <div class="movements__value">${formatMoney(
          mov,
          account.currency,
          account.locale
        )}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displaySummary = function (account) {
  const income = sum(account.movements.filter(mov => mov > 0));
  const out = Math.abs(sum(account.movements.filter(mov => mov < 0)));
  account.interest = (sum(account.movements) * account.interestRate) / 100;
  labelSumIn.textContent = formatMoney(
    income,
    account.currency,
    account.locale
  );
  labelSumOut.textContent = formatMoney(out, account.currency, account.locale);
  labelSumInterest.textContent = formatMoney(
    account.interest,
    account.currency,
    account.locale
  );
};

const displayBalance = function (account) {
  account.balance = sum(account.movements) + account.interest;
  labelBalance.textContent = formatMoney(
    account.balance,
    account.currency,
    account.locale
  );
};

const displayTimer = function (time) {
  const minutes = Math.trunc(time / 60);
  labelTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(
    time - minutes * 60
  ).padStart(2, '0')}`;
};

const displayGreeting = function (account) {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) greeting = 'Morning';
  else if (hour >= 12 && hour <= 16) greeting = 'Afternoon';
  else greeting = 'Evening';

  labelWelcome.textContent = `Good ${greeting}, ${
    account.owner.split(' ')[0]
  }!`;
};

const displayAccount = function (account, time) {
  displayGreeting(account);
  displayMovements(account);
  displaySummary(account);
  displayBalance(account);
  displayTimer(time);
  formatDate(account.locale);
};

const openAccount = function (currentUser) {
  // Display UI
  containerApp.style.opacity = 1;

  // Clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();

  // Displays all content related to account
  displayAccount(currentUser, time);

  // Resets time and removes timer
  time = 300;
  if (timer) window.clearInterval(timer);

  // Starts timer
  timer = window.setInterval(function () {
    time--;
    displayTimer(time);
    if (time == 0) closeAccount();
  }, 1000);
};

const closeAccount = function () {
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
  currentUser = undefined;
  window.clearInterval(timer);
  time = 300;
};

btnLogin.addEventListener('click', function () {
  currentUser = accounts.find(
    acc =>
      acc.username === inputLoginUsername.value &&
      acc.pin === +inputLoginPin.value
  );

  if (currentUser) openAccount(currentUser);
});

btnTransfer.addEventListener('click', function () {
  const amount = +inputTransferAmount.value;
  const receivingUser = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Process transfer if the amount is within the balance and greater than 0, and the user exists
  if (
    amount > 0 &&
    receivingUser &&
    amount <= currentUser.balance &&
    receivingUser?.username != currentUser.username
  ) {
    // Add deposit and withdrawl amount to movements of the accounts
    receivingUser.movements.push(amount);
    receivingUser.movementsDates.push(new Date().getDate.toISOString());
    currentUser.movements.push(-1 * amount);
    currentUser.movementsDates.push(new Date().toISOString());

    // Clear input fields
    inputTransferTo.value = inputTransferAmount.value = '';
  }

  // Update balance, movements, and summary
  displayAccount(currentUser, time);
});

btnLoan.addEventListener('click', function () {
  const loanAmount = Math.floor(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentUser.movements.some(mov => mov >= 0.1 * loanAmount)
  ) {
    currentUser.movements.push(loanAmount);
    currentUser.movementsDates.push(new Date().toISOString());
    displayAccount(currentUser, time);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function () {
  if (
    currentUser.username === inputCloseUsername.value &&
    currentUser.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      account => account.username === currentUser.username
    );
    accounts.splice(index, 1);

    closeAccount();

    inputCloseUsername.value = inputClosePin.value = '';
  }
});

btnSort.addEventListener('click', function () {
  sorted = !sorted;
  displayMovements(currentUser);
});

createUsernames(accounts);

currentUser = account1;
openAccount(currentUser);
