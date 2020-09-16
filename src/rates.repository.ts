import { Injectable, HttpService } from '@nestjs/common';

export interface Currencies {
  rates: any,
  base: string,
  date: string
}

@Injectable()
export class RatesRepository {

  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getCurrencies(): Promise<Currencies> {

    const { data } = await this.httpService.get('https://api.exchangeratesapi.io/latest').toPromise();

    return data;
  }
}
