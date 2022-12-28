import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../_model/product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {PriceSorting} from "../_model/priceSorting.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public search = new BehaviorSubject<string>("");
  PATH_OF_API ="http://localhost:9090";



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
  public getSortedProductByPrice(priceData : any):Observable<Product[]>{
    return this.httpClient.post<Product[]>(this.PATH_OF_API + "/products/getSortedProductByPrice",priceData);
  }

}

