// this resolver helps in loading back end first after that only this front end be loaded
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "./_model/product.model";
import {map, Observable, of} from "rxjs";
import {ProductService} from "./_services/product.service";
import {ImageProcessingServiceService} from "./image-processing-service.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private productService:ProductService,private imageProcessService: ImageProcessingServiceService ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product>  {
    const id = route.paramMap.get("productId") as number | null;
    if(id){
      return this.productService.getProductDetailsById(id)
        .pipe(
          map(p=> this.imageProcessService.createImages(p) )
        );
    }else {
      return of(this.getProductDetails());
    }
  }
  getProductDetails(){
    return{
      productId:null,
      productName :"",
      productDescription:"",
      productCategory:"",
      productSubCategory:"",
      productPrice:0,
      productImages:[]
    }
  }
}
