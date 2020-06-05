import { CartProduct } from "./cart-product";

export class Bill {
  $key: string;
  productos: CartProduct[];
  total: number;
}
