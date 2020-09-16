import {Controller, Get} from '@nestjs/common';
import {RatesRepository} from './rates.repository';

@Controller()
export class AppController {
    constructor(private readonly appService: RatesRepository) {
    }

    @Get()
    getHello(): string {

        console.log('abba.')

        return this.appService.getHello();
    }

    @Get()
    async getRates(): Promise<any> {

        const currencies = await this.appService.getCurrencies()

        const rates = currencies.rates;

        return rates;
    }
}
