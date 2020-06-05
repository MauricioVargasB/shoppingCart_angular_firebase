import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { CartProduct } from "../models/cart-product";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  shoppingCartList: AngularFireList<any>;
  billsNumber: number = 0;
  constructor(private firebase: AngularFireDatabase) {}
  getShoppingCartProducts() {
    return (this.shoppingCartList = this.firebase.list(
      "shoppingCart/cartProducts"
    ));
  }
  insertShoppingCartProduct(product: Product) {
    let cartProductAux = new CartProduct();
    cartProductAux.price = product.price;
    cartProductAux.$key = product.$key;
    cartProductAux.quantity = 0;
    this.firebase.database
      .ref(`shoppingCart/cartProducts/${product.$key}`)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          //Existe, por lo tanto se actualiza
          cartProductAux.quantity = snapshot.val().quantity;
          cartProductAux.quantity++;
          this.updateProduct(cartProductAux);
        } else {
          //No existe, se agrega
          this.insertCartProduct(product);
        }
      });
  }
  insertCartProduct(product: Product) {
    this.firebase
      .object(`/shoppingCart/cartProducts/${product.$key}`)
      .set({ id: product.$key, price: product.price, quantity: 1 });
  }
  updateProduct(product: CartProduct) {
    this.shoppingCartList.update(product.$key, {
      price: product.price,
      quantity: product.quantity,
    });
  }
  deleteProduct($key: string) {
    this.shoppingCartList.remove($key);
  }
}
