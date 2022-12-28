import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CartItem} from "../_model/cartItem.model";
import {Cart} from "../_model/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
 public cartItemList : any = [];
 public productList = new BehaviorSubject<any>([]) ;
  PATH_OF_API ="http://localhost:9090";


  constructor(private httpClient:HttpClient) { }
  addToCart(userId:any,productId:any):Observable<CartItem>{
   return  this.httpClient.get<CartItem>(this.PATH_OF_API + "/cart/"+userId+"/add/"+productId)
  }
  getCart(userId:any):Observable<Cart>{
    return this.httpClient.get<Cart>(this.PATH_OF_API + "/cart/"+userId+"/getCart")
  }

  removeItem(userId:number,productId:any):Observable<String>{
    return this.httpClient.get<string>(this.PATH_OF_API +"/cart/"+userId+"/remove/"+productId)
  }
  increaseQuantity(userId:any,productId:any):Observable<CartItem>{
    return this.httpClient.get<CartItem>(this.PATH_OF_API +"/cart/"+userId+"/increaseQuantity/"+productId)
  }
  decreaseQuantity(userId:any,productId:any):Observable<CartItem>{
    return this.httpClient.get<CartItem>(this.PATH_OF_API +"/cart/"+userId+"/decreaseQuantity/"+productId)
  }

  // getProducts(){
  //   return this.productList.asObservable();
  // }
  // setProduct(product: any){
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // }
  // addToCart(product:any){
  //   this.cartItemList.push(product);
  //   this.productList.next(this.cartItemList);
  //   this.getTotalPrice();
  // }
  // getTotalPrice(){
  //   let grandTotal =0;
  //   this.cartItemList.map((a:any)=>{
  //     grandTotal += a.total;
  //   })
  // }
  // removeCartItem(product:any){
  //   this.cartItemList.map((a:any,index:any)=>{
  //     if(product.productId == a.productId){
  //       this.cartItemList.splice(index,1)
  //     }
  //   })
  // }
}
