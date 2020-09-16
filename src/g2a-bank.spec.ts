import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RatesRepository } from './rates.repository';
import {HttpModule} from "@nestjs/common";
import {G2ABank} from "./g2a-bank";
import {MoneyModel} from "./money.model";

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports:[HttpModule],
      controllers: [G2ABank, AppController],
      providers: [RatesRepository],
    }).compile();
  });


  describe('exchange money', () => {
    it('should return monies', () => {

      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          500,
          'PLN',
          bank
      )

      bank.exchange(money, 'EUR').then((response)=>{
        expect(response).toBeInstanceOf(MoneyModel);
      }).catch((error)=>{
        expect(error).toBe(undefined);
      });
    });

    it('should return Euros', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          500,
          'PLN',
          bank
      )
      const expectedMoney = new MoneyModel(
          112.45810935426553,
          'EUR',
          bank
      )

      bank.exchange(money, 'EUR').then((response)=>{
        expect(response.isEqual(expectedMoney)).toBeTruthy();
      })
    });

    it('should return PLNs', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          100,
          'EUR',
          bank
      )
      const expectedMoney = new MoneyModel(
          444.61,
          'PLN',
          bank
      )
      bank.exchange(money, 'PLN').then((response)=>{
        expect(response.isEqual(expectedMoney)).toBeTruthy();
      })
    });

    it('should return money back if bank does not have such currency', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          100,
          'EUR',
          bank
      )

      bank.exchange(money, 'XOX').then((response)=>{
        expect(response.isEqual(money)).toBeTruthy();
      })
    });

    it('should double exchange from PLN to EUR and from EUR to USD', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          100,
          'PLN',
          bank
      )
      const expectedMoney = new MoneyModel(
          26.747036728818514,
          'USD',
          bank
      )

      bank.exchange(money, 'USD').then((response)=>{
        expect(response.isEqual(expectedMoney)).toBeTruthy();
      })
    });

    it('should double exchange from PLN to EUR and from EUR to USD', () => {
      const bank = app.get<G2ABank>(G2ABank);
      const money = new MoneyModel(
          100,
          'GBP',
          bank
      )
      const expectedMoney = new MoneyModel(
          212.36766382539767,
          'BGN',
          bank
      )

      bank.exchange(money, 'BGN').then((response)=>{
        expect(response).toBeInstanceOf(MoneyModel);
        expect(response.isEqual(expectedMoney)).toBeTruthy();
      }).catch((error) => {
        console.log(error)
      })
    });
  });
});
