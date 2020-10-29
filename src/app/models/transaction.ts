export class Transaction {
  type: string;
  coin: string;
  amount: number;
  otherCoin: string;
  otherAmount: number;
  ethAmount: number;
  hash: string;
  block: string;
  confirmed: boolean;
  lastPrice: number;
  lastGas: number;
  acquired: Date;
  blockDate = new Date(0);

  public static fromJson(data: string): Transaction {
    const jsonData = JSON.parse(data);
    const tx: Transaction = new Transaction();
    tx.type = jsonData.type;
    tx.coin = jsonData.coin;
    tx.amount = jsonData.amount;
    tx.otherCoin = jsonData.otherCoin;
    tx.otherAmount = jsonData.otherAmount;
    tx.ethAmount = jsonData.ethAmount;
    tx.hash = jsonData.hash;
    tx.block = jsonData.block;
    tx.confirmed = jsonData.confirmed;
    tx.lastPrice = jsonData.lastPrice;
    tx.lastGas = jsonData.lastGas;
    tx.acquired = new Date();
    tx.blockDate.setUTCSeconds(jsonData.blockDate);
    Transaction.round(tx);
    return tx;
  }

  public static round(tx: Transaction): void {
    tx.amount = Number(tx.amount?.toFixed(2));
    tx.otherCoin = tx.otherCoin?.substring(0, 6);
    tx.otherAmount = Number(tx.otherAmount?.toFixed(2));
    tx.lastPrice = Number(tx.lastPrice?.toFixed(2));
    tx.lastGas = Number(tx.lastGas?.toFixed(0));
    if (tx.acquired == null) {
      tx.acquired = new Date();
    }
  }
}
