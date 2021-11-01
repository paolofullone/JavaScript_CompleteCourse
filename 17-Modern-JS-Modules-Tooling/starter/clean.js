const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

// We had this in addExpense and CheckExpenses, so refactoring it:

const getLimit = user => spendingLimits?.[user] ?? 0;

const addExpense = function (value, description, user = 'jonas') {
  // if (!user) user = 'jonas'; // if there's no user, set to jonas. same as default parameter.
  user = user.toLowerCase();

  // let lim;
  // // check if the user informed exists in spendingLimits and set the limit to the user, otherwise set to 0.
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // we can do it like this:
  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  // or use optional chaining:
  // const limit = spendingLimits?.[user] ?? 0; // having only "spendingLimits?.[user]" means that if the spendingLimits of this user exists it will be set to the limit, otherwise it will be undefined, so we add the nulish covalescent operator to set it to zero.

  // refactored to:
  // const limit = getLimit(user);
  // Refactored to getLimit and put it inside the if check below.

  // if the value is less than the limit, the expense is added , otherwise its not added.
  if (value <= getLimit(user)) {
    // budget.push({ value: -value, description: description, user: user });
    budget.push({ value: -value, description, user });
  }
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');

// const check = function () {
const checkExpenses = function () {
  // let lim;
  // if (spendingLimits[entry.user]) {
  //   lim = spendingLimits[entry.user];
  // } else {
  //   lim = 0;
  // }

  // Replaced by:
  // const limit = spendingLimits?.[entry.user] ?? 0;
  // Refactored to getLimit and put it inside the if check below.

  for (const entry of budget)
    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit'; //in the array we can se a limit flag on this the items above limit.
};
// With te refactored to we were able to remove two pairs of {}

checkExpenses();

const loBigExpenses = function (bigLimit) {
  let output = '';
  // if (entry.value <= -bigLimit) {
  //   // output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars
  //   output += `${entry.description.slice(-2)}  / `; // Emojis counts as 2 chars
  // }

  // If replaced by ternary operator (also allowing to remove one pair of {})

  for (const entry of budget)
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)}  / ` : '';

  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

console.log(budget);
loBigExpenses(500);

// 1 - canged funtion name add to addExpense
// 2 - changed all the VAR to CONST
// 3 - changed limits to spendingLimits
