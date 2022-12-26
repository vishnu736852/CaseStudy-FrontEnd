import {Product} from "./product.model";

export interface CartItem {
  cartItemId: number;
  quantity: number;
  product: Product;
}
