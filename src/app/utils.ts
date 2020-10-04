import {HttpErrorResponse} from '@angular/common/http';

export class Utils {
  private static loading = false;
  private static alertMessage: string;
  public static ACTIVE_PREFIX = 'Active';
  public static BLOCKED_PREFIX = 'Blocked';

  public static errorToText(err: HttpErrorResponse): string {
    let s = err.status + ':';
    if (err.error) {
      s += err.error.message;
    } else {
      s += err.message;
    }
    return s;
  }

  public static loadingOn(): void {
    setTimeout(() => {
      this.loading = true;
    });
  }

  public static loadingOff(): void {
    setTimeout(() => {
      this.loading = false;
    });
  }

  public static isLoading(): boolean {
    return this.loading;
  }

  public static getLoading(): boolean {
    return this.loading;
  }

  public static formatAmount(amount: string, currency: string, creditdebit: string): string {
    if (!this.isNull(amount)) {
      amount = amount.replace(',', '.');
      let n = parseFloat(amount);
      if (!this.isNull(creditdebit) && creditdebit !== '1') {
        n = -n;
      }
      if (this.isNull(currency)) {
        return this.formatNumber(n);
      } else {
        return this.formatNumber(n) + ' ' + currency;
      }
    } else {
      return '0,00';
    }
  }

  public static formatNumber(n: number, fraction: number = 2): string {
    if (n) {
      return n.toLocaleString(undefined, {
        useGrouping: true,
        minimumIntegerDigits: 1,
        minimumFractionDigits: fraction,
        maximumFractionDigits: fraction
      });
    } else {
      return '0,00';
    }
  }

  public static getAlertMessage(): string {
    return this.alertMessage;
  }

  public static setAlertMessage(m: string): void {
    this.alertMessage = m;
    setTimeout(() => {
      this.alertMessage = undefined;
    }, 5000);
  }

  public static clearStaticMessage(): void {
    this.alertMessage = undefined;
  }

  public static cardActiveColor(sintstatus: number): string {
    if (sintstatus === undefined) {
      return '';
    }

    if (sintstatus !== 11) {
      return '#be241a';
    } else {
      return '#29a623';
    }
  }

  public static cardClientStatusColor(status: string): string {
    if (status === undefined) {
      return '';
    }

    if (status.startsWith(Utils.ACTIVE_PREFIX)) {
      return '#29a623';
    } else {
      return '#be241a';
    }
  }

  public static acceptedColor(accepted: boolean): string {
    if (this.isNull(accepted)) {
      return;
    }
    if (accepted) {
      return '#29a623';
    } else {
      return '#be241a';
    }
  }

  public static isNull(o): boolean {
    return o === undefined || o === null;
  }

  public static isEmpty(s: string): boolean {
    return this.isNull(s) || s.trim() === '';
  }

  public static findInArray(array: any[], name): boolean {
    for (const el of array) {
      if (el.name === name) {
        return true;
      }
    }
    return false;
  }

  public static deleteFromArray(array: any[], el: any): any[] {
    const index = array.indexOf(el, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
}
