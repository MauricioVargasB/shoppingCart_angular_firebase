import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/product";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.css"],
})
export class ProductItemComponent implements OnInit {
  constructor() {}
  @Input() product: Product;
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();
  oldPrice: number;
  ngOnInit() {
    this.oldPrice = this.product.price + 30;
  }
  onSubmit() {
    this.addToCart.emit(this.product);
  }
}
