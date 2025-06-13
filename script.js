'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account2.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc, i, accs) {
    accs[i].username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

// const deposits = movements.filter(mov => mov > 0);

// const deposits1 = [];
// for (const mov of movements) if (mov > 0) deposits1.push(mov);

// const deposits2 = [];
// movements.forEach(function (mov) {
//   if (mov > 0) deposits2.push(mov);
// });

// console.log(deposits); // [200, 450, 3000, 70, 1300]
// console.log(deposits1);
// console.log(deposits2);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// const eurToUSD = 1.1;
// const movementsUSD = movements.map(mov => mov * eurToUSD);

// const movementsUSD1 = [];
// for (const mov of movements) movementsUSD1.push(mov * eurToUSD);

// const movementsUSD2 = [];
// movements.forEach(map => movementsUSD2.push(map * eurToUSD));

// console.log(movementsUSD);
// console.log(movementsUSD1);
// console.log(movementsUSD2);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescriptions);

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// // SLICE

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2)); // ['c', 'd', 'e']
// console.log(arr.slice(2, 4)); // ['c', 'd']
// console.log(arr.slice(-2)); // ['d', 'e']
// console.log(arr.slice(-1)); // ['e']
// console.log(arr.slice(1, -2)); // ['b', 'c']
// console.log(arr.slice()); // makes a shallow copy, same as [...arr]

// // SPLICE
// console.log(arr.splice(2, 2)); // ['c', 'd']
// console.log(arr); // ['a', 'b', 'e']
// console.log(arr.splice(-1)); // ['e']
// console.log(arr); // ['a', 'b']

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
// console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

// // CONCAT
// console.log(arr.concat(arr2)); // ['a', 'b', 'c', 'd', 'e', 'j', 'i', 'h', 'g', 'f']
// console.log(arr); // ['a', 'b', 'c', 'd', 'e']
// console.log(arr2); // ['a', 'b', 'c', 'd', 'e']
// // same as
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(arr.join('-')); // a-b-c-d-e

// // AT

// const array = [23, 11, 64];
// console.log(array[0]); // 23
// console.log(array.at(0)); // 23

// console.log(array[array.length - 1]); // 64
// console.log(array.slice(-1)[0]); // 64
// console.log(array.at(-1)); // 64

// console.log('hello'[0]); // h
// console.log('hello'[1]); // o

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// movements.forEach(function (movement, i, fullArray) {
//   movement > 0
//     ? console.log(`Movement ${i + 1}: You deposited ${movement}`)
//     : console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
// });

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });
