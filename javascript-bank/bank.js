/* exported Bank */
function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = [];
};

Bank.prototype.openAccount = function (holder, balance) {
  if (balance > 0 && Number.isInteger(balance)) {
    var new_account = new Account(this.nextAccountNumber, holder);
    new_account.deposit(balance);
    this.accounts.push(new_account);
    this.nextAccountNumber++;
    return new_account.number;

  } else {
    return null;
  }

}

Bank.prototype.getAccount = function (number) {
  for (var i = 0; i < this.accounts.length; i++) {
    if (number === this.accounts[i].number) {
      return this.accounts[i];
    }
  }
  return null;
};

Bank.prototype.getTotalAssets = function () {
  var total = 0;

  if (this.accounts.length === 0) {
    return 0;

  } else {
    for (var i = 0; i < this.accounts.length; i++) {
      total += this.accounts[i].getBalance();

    }
    return total;
  }

};
