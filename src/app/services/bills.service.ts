import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { CartProduct } from "../models/cart-product";
import { ShoppingCartService } from "./shopping-cart.service";

@Injectable({
  providedIn: "root",
})
export class BillsService {
  billsList: AngularFireList<any>;
  billsNumber: number = 0;
  constructor(
    private firebase: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  getBills() {
    return (this.billsList = this.firebase.list("bills"));
  }
  checkOut(cartProductList: CartProduct[], total: number) {
    this.insertBill(cartProductList, total);
  }
  insertBill(cartProductList: CartProduct[], total: number) {
    let id = this.billsList.push({
      total: total,
    });
    let ruta = "/bills/" + id.key + "/products";
    cartProductList.forEach((cartProduct) => {
      this.firebase
        .object(ruta + `/${cartProduct.$key}`)
        .set({ quantity: cartProduct.quantity, price: cartProduct.price });
      this.shoppingCartService.deleteProduct(cartProduct.$key);
    });
  }
}
