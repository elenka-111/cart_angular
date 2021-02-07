import { Injectable } from '@angular/core';

interface CartItem{
  id: number;
  name: string;
  count: number;
  price: number;
}

@Injectable({providedIn: 'root'})
export class CartServise{

  // tslint:disable-next-line:ban-types
  public rateUrl: String = 'https://www.cbr-xml-daily.ru/daily_json.js';
  public selectedCart: CartItem[] = [
    {
      id: 0,
      name: 'Товар 1',
      count: 1,
      price: 20
    },
    {
      id: 1,
      name: 'Товар 2',
      count: 3,
      price: 45
    },
    {
      id: 2,
      name: 'Товар 3',
      count: 1,
      price: 67 },
    {
      id: 3,
      name: 'Товар 4',
      count: 1,
      price: 1305
    }
  ];

  public currency = {
    available: {
      RUB: 'rubles',
      EUR: 'euros',
      USD: 'US dollars',
      GBP: 'pounds',
      JPY: 'yens'
    },
    base: 'USD',
    active: 'USD',
  };
  public rateValute = {};
  public arrayTotal = {};

  getTotalPrice(): number{
    return Object.keys(this.arrayTotal).length ? this.arrayTotal[this.currency.active] : 0;
  }

  async getTotalCartPrice(): Promise<any> {
    if (Object.keys(this.rateValute).length === 0) {
      const rate = await this.getRate();
      if (rate) {
        // Сохраняем курс в глобальную переменную
        this.rateValute = rate.Valute;
      }
    }
    this.calcTotalCartPrice();
  }

  calcTotalCartPrice(): void{
    const sum = this.getTotalSum();
    // пересчет относительно базовой валюты веб сервиса - RUB
    // @ts-ignore
    const sumRub = this.currency.base === 'RUB' ? sum : sum * this.rateValute[this.currency.base].Value;

    this.arrayTotal =
      Object.keys(this.currency.available).reduce((previousValue, item) => {
        if (item === 'RUB') {
          previousValue[item] = sumRub;
        } else {
          // @ts-ignore
          previousValue[item] = sumRub / this.rateValute[item].Value;
        }
        return previousValue;
      }, {});
  }

  async getRate(): Promise<any>{
    // @ts-ignore
    const response = await fetch( this.rateUrl );
    if (response.ok) {
      const rate = response.json();
      return rate;
    } else {
      console.log('Ошибка HTTP: ' + response.status);
    }

  }
  getTotalSum(): number{
    return this.selectedCart.reduce((previousValue, item) => previousValue + item.price * item.count, 0);
  }

  changeValute(val: string): void{
    this.currency.active = val;
    console.log(val);
  }

  deleteCartItem(id: number): void{
    this.selectedCart = this.selectedCart.filter((item) => item.id !== id);
    this.calcTotalCartPrice();
  }

  changeCount(count: number, id: number): void{
    this.selectedCart = this.selectedCart.map(item => {
      if (item.id === id) {
        item.count = count;
      }
      return item;
    });
    this.calcTotalCartPrice();
  }

}
