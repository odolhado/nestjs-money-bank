import {Money, MoneyModel} from "./money.model";
import {Bank} from "./bank";
import {Injectable} from "@nestjs/common";
import {Currencies, RatesRepository} from "./rates.repository";

@Injectable()
export class G2ABank implements Bank {

  private currencies: Currencies;

  constructor(private ratesRepository: RatesRepository) {}

  async exchange(money: Money, newCurrency: string): Promise<Money> {
    this.currencies = await this.ratesRepository.getCurrencies();

    const rates = this.currencies.rates;

    if (this.isNoExpectedCurrencyInTheBank(newCurrency)) {
      return money;
    }

    if (this.isBanksBaseCurrency(newCurrency, money)) {
      return new MoneyModel(
          money.getValue() / rates[money.getCurrency()],
          newCurrency,
          this
      )
    }

    if (this.isFromBaseCurrency(newCurrency, money)) {
      return new MoneyModel(
          money.getValue() * rates[newCurrency],
          newCurrency,
          this
      )
    }

    if (this.isDoubleExchange(newCurrency, money)) {
      const baseMoney = await this.exchange(money, this.currencies.base);

      return new MoneyModel(
          baseMoney.getValue() * rates[newCurrency],
          newCurrency,
          this
      )
    }

    return money;
  }

  private isNoExpectedCurrencyInTheBank(newCurrency: string): boolean {
    return !this.currencies.rates[newCurrency] && this.currencies.base !== newCurrency;
  }

  private isBanksBaseCurrency(newCurrency: string, money: Money): boolean {
    return newCurrency === this.currencies.base && this.currencies.rates[money.getCurrency()];
  }

  private isFromBaseCurrency(newCurrency: string, money: Money): boolean {
    return this.currencies.rates[newCurrency] && money.getCurrency() == this.currencies.base;
  }

  private isDoubleExchange(newCurrency: string, money: Money): boolean {
    return this.currencies.rates[newCurrency] && this.currencies.rates[money.getCurrency()];
  }
}
