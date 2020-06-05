import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
//firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { HeaderComponent } from "./components/shared/header/header.component";
import { NavComponent } from "./components/shared/nav/nav.component";
import { CartItemComponent } from "./components/shopping-cart/cart/cart-item/cart-item.component";
import { CartComponent } from "./components/shopping-cart/cart/cart.component";
import { ProductItemComponent } from "./components/shopping-cart/product-list/product-item/product-item.component";
import { ProductListComponent } from "./components/shopping-cart/product-list/product-list.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { BillsService } from "./services/bills.service";
//Services
import { ProductService } from "./services/product.service";
import { ShoppingCartService } from "./services/shopping-cart.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ShoppingCartComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [ProductService, ShoppingCartService, BillsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
