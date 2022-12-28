import {Component, OnInit} from '@angular/core';
import {ProductService} from "../_services/product.service";
import {map} from "rxjs";
import {Product} from "../_model/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageProcessingServiceService} from "../image-processing-service.service";
import {Router} from "@angular/router";
import { FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  priceData = new FormGroup({
    minPrice : new FormControl('',[Validators.required]),
    maxPrice : new FormControl('',[Validators.required])
  }) ;

  productDetails: Product[]=[];
  searchKey:string ="";
  public filterCategory:any;


  constructor(private productService:ProductService,
              private imageProcessingService : ImageProcessingServiceService,
              private router:Router

  ) {
  }
  ngOnInit():void {
    this.getAllProducts();
    this.productService.search.subscribe(
      value => {
        this.searchKey=value;
      }
    )
  }


  getSortedProductByPrice(){
    // console.log(this.priceData.value)
    this.productService.getSortedProductByPrice(this.priceData.value)
      .pipe(
        map((p:Product[])=>p.map((product:Product) =>this.imageProcessingService.createImages(product)))
      )
      .subscribe(
      (resp)=>{
        console.log(resp)
        this.productDetails=resp;
        this.filterCategory=resp;
        this.productDetails.forEach((a :any)=>{
          }
        )
      },error => {
        console.log(error)
      }
    )
  }
  public getAllProducts(){
    this.productService.getAllProducts()
      .pipe(
        map((x: Product[],i)=> x.map((product:Product) => this.imageProcessingService.createImages(product))
        )
      )
      .subscribe(
        (resp:Product[]) =>{
          // console.log(resp);
          this.productDetails=resp;
          this.filterCategory=resp;
          this.productDetails.forEach((a :any)=>{

            }
            )},
        (error:HttpErrorResponse)=>{
          console.log(error);
        }
      );
  }
  showProductDetails(productId:number){
      this.router.navigate(['productViewDetails',{productId:productId}])
  }
  filter(category:string){
      this.filterCategory = this.productDetails
        .filter((a:any)=>{
          if(a.productCategory == category || category==''){
            return a;
          }
          }
        )
  }
  sort(){
    let minimumPrice :any = this.priceData.value.minPrice
   let  maximumPrice :any = this.priceData.value.maxPrice
    this.filterCategory = this.productDetails
      .filter((a:any)=>{
          if(a.productPrice > minimumPrice && a.productPrice<maximumPrice){
            console.log(a)
            return a;
          }
        }
      )
  }

}
