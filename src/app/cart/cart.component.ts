import { Component, OnInit } from '@angular/core';
import {CartServise} from '../shared/cart.servise';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartServise: CartServise) { }

  ngOnInit(): void {
    this.cartServise.getTotalSum();
    this.cartServise.getTotalCartPrice().then(
      result => {
        console.log('00000', this.cartServise.arrayTotal);
      }
    ).catch(
      error => console.log('Получена ошибка ', error)
    );
  }

  delete(id: number): void{
    this.cartServise.deleteCartItem(id);
  }

  changeValute(val: any): void{
    this.cartServise.changeValute(val.target.value);
  }

  changeCount(tar: any, id: number): void{
    console.log(id);
    this.cartServise.changeCount(tar.target.value, id);
  }


}
