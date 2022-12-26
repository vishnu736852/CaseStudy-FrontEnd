import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../_model/product.model";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public search = new BehaviorSubject<string>("");


  constructor(private httpClient:HttpClient) { }
  public addProduct(product:FormData){
    return this.httpClient.post<Product>("http://localhost:9090/products/addProduct",product);
  }
  public getAllProducts(){
    return this.httpClient.get<Product[]>("http://localhost:9090/products/getAllProducts")
  }
  public deleteProduct(productId : number){
    return this.httpClient.get<Product[]>("http://localhost:9090/products/deleteProduct/" + productId)
  }
  public getProductDetailsById(productId :number){
    return this.httpClient.get<Product>("http://localhost:9090/products/getById/"+productId)
  }

}

