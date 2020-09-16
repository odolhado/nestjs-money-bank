import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { RatesRepository } from './rates.repository';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [RatesRepository],
})
export class AppModule {}
