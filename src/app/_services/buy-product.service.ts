import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartItem} from "../_model/cartItem.model";
import {Observable} from "rxjs";
import {Order} from "../_model/order.model";

@Injectable({
  providedIn: 'root'
})
export class BuyProductService {
  PATH_OF_API ="http://localhost:9090";

  constructor(private httpClient:HttpClient) { }

  createOrder(userId:number):Observable<Order>{
    return  this.httpClient.get<Order>(this.PATH_OF_API + "/order/"+userId+"/createOrder")
  }

  getOrders(userId:number):Observable<Order[]>{
    return  this.httpClient.get<Order[]>(this.PATH_OF_API + "/order/"+userId+"/getOrders")
  }
}
