import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RatesRepository } from './rates.repository';
import {HttpModule} from "@nestjs/common";

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports:[HttpModule],
      controllers: [AppController],
      providers: [RatesRepository],
    }).compile();
  });

  describe('getCurrencies', () => {
    it('should return currencies', () => {
      const appController = app.get<AppController>(AppController);
      appController.getRates().then((response)=>{
        expect(response.AUD).toBe(1.6219);
      });
    });
  });
});
