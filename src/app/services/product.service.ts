import { Injectable } from "@angular/core";
//Database
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();
  constructor(private firebase: AngularFireDatabase) {}

  getProduct() {
    return (this.productList = this.firebase.list("products"));
  }
  insertProduct(product: Product) {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price,
    });
  }
  updateProduct(product: Product) {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price,
    });
  }
  async getProductByID($key: string): Promise<Product> {
    let item = new Product();
    let a = await this.firebase.database
      .ref("/products/" + $key)
      .once("value", (snapshot) => {
        item = snapshot.val();
      });
    return item;
  }
}
