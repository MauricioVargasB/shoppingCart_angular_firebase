import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CartProduct } from "src/app/models/cart-product";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.css"],
})
export class CartItemComponent implements OnInit {
  @Input() cartProduct: CartProduct;
  @Output() removeProduct: EventEmitter<any> = new EventEmitter<any>();
  @Output() quantityManage: EventEmitter<any> = new EventEmitter<any>();
  product: Product;
  total: number;
  oldPrice: number;
  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.product = new Product();
    this.oldPrice = this.cartProduct.price + 30;
    this.total = this.cartProduct.quantity * this.cartProduct.price;
    this.getProduct();
  }
  async getProduct() {
    this.product = await this.productService.getProductByID(
      this.cartProduct.$key
    );
  }
  onRemove() {
    this.removeProduct.emit(this.cartProduct.$key);
  }

  // getProduct():Promise<any> {
  //   return this.productService.getProductByID(this.cartProduct.$key);
  // }
  increase() {
    this.quantityManage.emit({
      id: this.cartProduct.$key,
      accion: "Increase",
      cartProduct: this.cartProduct,
    });
  }
  decrease() {
    this.quantityManage.emit({
      id: this.cartProduct.$key,
      accion: "Decrease",
      cartProduct: this.cartProduct,
    });
  }
}
