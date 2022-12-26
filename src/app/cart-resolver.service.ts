import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Cart} from "./_model/cart.model";
import {map, Observable, of} from "rxjs";
import {CartService} from "./_services/cart.service";
import {ImageProcessingServiceService} from "./image-processing-service.service";
import {CartComponent} from "./cart/cart.component";

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<Cart> {
  constructor(private cartService: CartService, private imageProcessService: ImageProcessingServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cart> | Promise<Cart> | Cart {
    let cart : CartComponent;

    const id = route.paramMap.get("userId") as number | null;
    if (id) {
      return this.cartService.getCart(id)

    } else {
      return of(this.getCart());
    }
  }

  getCart() {
    return {
      userId : 0,
      cartId:0,
      cartItem: []
    }
  }
}
