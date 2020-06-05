import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.productService
      .getProduct()
      .snapshotChanges()
      .subscribe((item) => {
        this.productList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        });
      });
  }
  addToCart(event) {
    this.shoppingCartService.insertShoppingCartProduct(event);
  }
}
