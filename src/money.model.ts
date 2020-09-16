import {Bank} from "./bank";

export interface Money extends ValueObject{
  getValue(): number
  getCurrency(): string
}

interface ValueObject {
  isEqual(object: any): boolean
}

export class MoneyModel implements Money {
  constructor(
      private value: number,
      private currency: string,
      private bank: Bank,
  ) {}

  getValue(): number {
    return this.value;
  }
  getCurrency(): string {
    return this.currency;
  }

  isEqual(object: MoneyModel): boolean {
    return object.getCurrency() === this.getCurrency() &&
        object.getValue() === this.getValue();
  }

  async add(money: Money): Promise<Money> {
    const convertedMoney = await this.bank.exchange(money, this.currency);

    return new MoneyModel(
        this.value + convertedMoney.getValue(),
        this.currency,
        this.bank
    )
  }

  async sub(subMoney: MoneyModel): Promise<Money> {
    const convertedMoney = await this.bank.exchange(subMoney, this.currency);

    return new MoneyModel(
        this.value - convertedMoney.getValue(),
        this.currency,
        this.bank
    )
  }
}
