module.exports.FifoCount = class FifoCount {
  constructor () {
    this.pool = [  ];
    this.transactions = [  ];
  }

  add (transaction) {
    this.transactions.push(transaction);
  }

  count () {
    const res = [  ];
    while (true) {
      const transaction = this.transactions.shift();
      if (!transaction) {
        break;
      }
      if (transaction.type === 'in') {
        this.pool.push(transaction);
      } else if (transaction.type === 'out') {
        res.push(this.calculateTrade(transaction));
      }
    }
    return res;
  }

  calculateTrade (transaction) {
    let poolItem = this.pool.shift();
    if (poolItem.amount > transaction.amount) {
      const profit = transaction.amount * transaction.price - transaction.amount * poolItem.price;
      const res = {
        amount: transaction.amount,
        inPrice: poolItem.price,
        outPrice: transaction.price,
        profit: profit
      };
      poolItem.amount -= transaction.amount;
      this.pool.unshift(poolItem);
      return res;
    } else if (poolItem.amount <= transaction.amount) {
      let profit = 0;
      let amount = transaction.amount;
      while (amount > 0) {
        const curAmount = Math.min(amount, poolItem.amount);
        profit += curAmount * transaction.price - curAmount * poolItem.price;
        amount -= curAmount;
        poolItem.amount -= curAmount;
        if (amount > 0 && poolItem.amount === 0) {
          poolItem = this.pool.shift();
          if (!poolItem) {
            throw Error('Transaction expected, but pool was empty');
          }
        }
      }
      if (poolItem.amount > 0) {
        this.pool.unshift(poolItem);
      }
      const res = {
        amount: transaction.amount,
        inPrice: poolItem.price,
        outPrice: transaction.price,
        profit: profit
      };
      return res;
    }
    throw new Error('Not implemented yet!');
  }
};
module.exports.__esModule = true;
