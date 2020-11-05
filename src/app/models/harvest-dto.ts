export class HarvestDto {
  id: string;
  hash: string;
  block: number;
  confirmed: boolean;
  blockDate: number;
  methodName: string;
  owner: string;
  amount: number;
  vault: string;
  lastGas: number;
  lastTVL: number;
  ownerCount: number;
  blockDateAdopted: Date;
  acquired: Date;

  public static fromJson(data: string): HarvestDto {
    const jsonData = JSON.parse(data);
    const tx: HarvestDto = new HarvestDto();
    tx.id = jsonData.id;
    tx.hash = jsonData.hash;
    tx.block = jsonData.block;
    tx.confirmed = jsonData.confirmed;
    tx.methodName = jsonData.methodName;
    tx.owner = jsonData.owner;
    tx.amount = jsonData.amount;
    tx.vault = jsonData.vault;
    tx.lastGas = jsonData.lastGas;
    tx.lastTVL = jsonData.lastTVL;
    tx.ownerCount = jsonData.ownerCount;
    tx.blockDate = jsonData.blockDate;

    tx.acquired = new Date();
    HarvestDto.round(tx);
    return tx;
  }

  public static round(tx: HarvestDto): void {
    tx.amount = Number(tx.amount?.toFixed(2));
    tx.lastGas = Number(tx.lastGas?.toFixed(0));
    tx.lastTVL = Number(tx.lastTVL?.toFixed(0));
    if (tx.acquired == null) {
      tx.acquired = new Date();
    }
    HarvestDto.fillBlockDateAdopted(tx);
  }

  public static fillBlockDateAdopted(tx: HarvestDto): void {
    if (tx.blockDateAdopted == null) {
      const d = new Date(0);
      d.setUTCSeconds(tx.blockDate);
      tx.blockDateAdopted = d;
    }
  }
}
