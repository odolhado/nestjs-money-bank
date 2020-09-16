import {Money} from "./money.model";



export interface Bank  {
  exchange(money: Money, currency: string): Promise<Money>;
}
