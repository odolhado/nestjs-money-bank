import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RatesRepository } from './rates.repository';
import {HttpModule} from "@nestjs/common";
import {G2ABank} from "./g2a-bank";
import {MoneyModel} from "./money.model";

describe('MoneyModel', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports:[HttpModule],
      controllers: [G2ABank, AppController],
      providers: [RatesRepository],
    }).compile();
  });

  describe('add money', () => {
    it('should add monies', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          100,
          'EUR',
          bank
      )
      const addMoney = new MoneyModel(
          100,
          'EUR',
          bank
      )

      const expectedSumMoney = new MoneyModel(
          money.getValue() + addMoney.getValue(),
          money.getCurrency(),
          bank
      )

      money.add(addMoney).then((response) => {
        expect(response.isEqual(expectedSumMoney)).toBeTruthy();
      }).catch((error) => {
        console.log(error);
      });
    });

    it('should add monies of different currency', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          100,
          'PLN',
          bank
      )
      const addMoney = new MoneyModel(
          100,
          'USD',
          bank
      )

      const expectedSumMoney = new MoneyModel(
          473.8731920618904,
          'PLN',
          bank
      )

      money.add(addMoney).then((response) => {
        expect(response.getValue()).toBe(expectedSumMoney.getValue());
        expect(response.getCurrency()).toBe(expectedSumMoney.getCurrency());
        expect(response.isEqual(expectedSumMoney)).toBeTruthy();
      }).catch((error) => {
        console.log(error);
      });
    });

    it('should substract monies ', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          100,
          'PLN',
          bank
      )
      const subMoney = new MoneyModel(
          60,
          'PLN',
          bank
      )

      const expectedSumMoney = new MoneyModel(
          40,
          'PLN',
          bank
      )

      money.sub(subMoney).then((response) => {
        expect(response.isEqual(expectedSumMoney)).toBeTruthy();
      }).catch((error) => {
        console.log(error);
      });
    });

    it('should substract more monies ', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          100,
          'PLN',
          bank
      )
      const subMoney = new MoneyModel(
          160,
          'PLN',
          bank
      )
      const expectedSumMoney = new MoneyModel(
          -60,
          'PLN',
          bank
      )

      money.sub(subMoney).then((response) => {
        expect(response.isEqual(expectedSumMoney)).toBeTruthy();
      }).catch((error) => {
        console.log(error);
      });
    });

    it('should substract more monies ', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          100,
          'PLN',
          bank
      )
      const subMoney = new MoneyModel(
          10,
          'USD',
          bank
      )
      const expectedSumMoney = new MoneyModel(
          62.612680793810966,
          'PLN',
          bank
      )

      money.sub(subMoney).then((response) => {
        expect(response.isEqual(expectedSumMoney)).toBeTruthy();
      }).catch((error) => {
        console.log(error);
      });
    });
  });
});