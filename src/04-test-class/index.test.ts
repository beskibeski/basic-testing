// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = new BankAccount(100);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBeDefined;
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = new BankAccount(100);
    const balance = bankAccount.getBalance();
    const withdrawMoreThanBalance = () =>
      bankAccount.withdraw(balance + balance);
    expect(withdrawMoreThanBalance).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = new BankAccount(100);
    const anotherBankAccount = new BankAccount(0);
    const balance = bankAccount.getBalance();
    const transferring = () =>
      bankAccount.transfer(balance + balance, anotherBankAccount);
    expect(transferring).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = new BankAccount(100);
    const balance = bankAccount.getBalance();
    const transferring = () => bankAccount.transfer(balance, bankAccount);
    expect(transferring).toThrowError();
  });

  test('should deposit money', () => {
    const bankAccount = new BankAccount(100);
    const balanceBeforeDeposit = bankAccount.getBalance();
    const deposit = 100;
    bankAccount.deposit(deposit);
    const balanceAfterDeposit = bankAccount.getBalance();
    expect(balanceAfterDeposit).toBe(balanceBeforeDeposit + deposit);
  });

  test('should withdraw money', () => {
    const bankAccount = new BankAccount(100);
    const balanceBeforeWithdraw = bankAccount.getBalance();
    const withdraw = 50;
    bankAccount.withdraw(withdraw);
    const balanceAfterWithdraw = bankAccount.getBalance();
    expect(balanceAfterWithdraw).toBe(balanceBeforeWithdraw - withdraw);
  });

  test('should transfer money', () => {
    const bankAccountRecipient = new BankAccount(100);
    const bankAccountTransferer = new BankAccount(200);
    const bankAccountRecipientBalance = bankAccountRecipient.getBalance();
    const bankAccountTransfererBalance = bankAccountTransferer.getBalance();
    const transfer = 100;
    bankAccountTransferer.transfer(transfer, bankAccountRecipient);
    const bankAccountRecipientBalanceAfterTransfer =
      bankAccountRecipient.getBalance();
    const bankAccountTransfererBalanceAfterTransfer =
      bankAccountTransferer.getBalance();
    expect(bankAccountRecipientBalanceAfterTransfer).toBe(
      bankAccountRecipientBalance + transfer,
    );
    expect(bankAccountTransfererBalanceAfterTransfer).toBe(
      bankAccountTransfererBalance - transfer,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = new BankAccount(200);
    const fetchBalance = await bankAccount.fetchBalance();
    if (fetchBalance !== null) {
      expect(typeof fetchBalance).toBe('number');
    } else {
      expect(typeof fetchBalance).not.toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = new BankAccount(200);
    const balanceBeforeSync = bankAccount.getBalance();
    const newBalance = balanceBeforeSync + balanceBeforeSync;
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(newBalance);
    await bankAccount.synchronizeBalance();
    const balanceAfterSync = bankAccount.getBalance();
    expect(balanceAfterSync).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = new BankAccount(200);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);
    const synchronizeBalance = bankAccount.synchronizeBalance();
    await expect(synchronizeBalance).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
