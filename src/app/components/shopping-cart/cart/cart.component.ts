import { Component, OnInit } from "@angular/core";
import { Bill } from "src/app/models/bill";
import { CartProduct } from "src/app/models/cart-product";
import { BillsService } from "src/app/services/bills.service";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cartProductList: CartProduct[];
  bills: Bill[];
  total = 0;
  checkOutActive = false;
  disabledCheckout = true;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private billService: BillsService
  ) {}

  ngOnInit() {
    this.inicializar();
    this.inicializar2();
  }
  inicializar() {
    this.shoppingCartService
      .getShoppingCartProducts()
      .snapshotChanges()
      .subscribe((item) => {
        this.cartProductList = [];
        this.total = 0;
        if (item.length == 0) this.disabledCheckout = true;
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.cartProductList.push(x as CartProduct);
          let a = x as CartProduct;
          this.total = this.total + a.price * a.quantity;
          this.disabledCheckout = false;
        });
      });
  }
  inicializar2() {
    this.billService
      .getBills()
      .snapshotChanges()
      .subscribe((item) => {
        this.bills = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.bills.push(x as Bill);
        });
      });
  }
  removeProduct(event) {
    this.shoppingCartService.deleteProduct(event);
  }
  onCheckOut() {
    this.billService.checkOut(this.cartProductList, this.total);
    this.checkOutActive = true;
    this.disabledCheckout = true;
  }
  closeMessage() {
    this.checkOutActive = false;
  }
  quantityManage(event) {
    if (event.accion == "Increase") {
      let cartProduct = event.cartProduct as CartProduct;
      cartProduct.quantity++;
      this.shoppingCartService.updateProduct(cartProduct);
    } else if (event.accion == "Decrease") {
      let cartProduct = event.cartProduct as CartProduct;
      if (cartProduct.quantity > 1) {
        cartProduct.quantity--;
        this.shoppingCartService.updateProduct(cartProduct);
      } else {
        this.shoppingCartService.deleteProduct(event.cartProduct.$key);
      }
    }
  }
}
