export class Transaction {
  type: string;
  coin: string;
  amount: number;
  otherCoin: string;
  otherAmount: number;
  ethAmount: number;
  hash: string;
  confirmed: boolean;
  lastPrice: number;

  public static fromJson(data: string): Transaction {
    const jsonData = JSON.parse(data);
    const tx: Transaction = new Transaction();
    tx.type = jsonData.type;
    tx.coin = jsonData.coin;
    tx.amount = jsonData.amount.toFixed(2);
    tx.otherCoin = jsonData.otherCoin.substring(0, 6);
    tx.otherAmount = jsonData.otherAmount.toFixed(2);
    tx.ethAmount = jsonData.ethAmount;
    tx.hash = jsonData.hash;
    tx.confirmed = jsonData.confirmed;
    tx.lastPrice = jsonData.lastPrice;
    return tx;
  }
}
