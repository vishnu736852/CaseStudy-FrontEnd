import {Component, OnInit} from '@angular/core';
import {ProductService} from "../_services/product.service";
import {Product} from "../_model/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ShowProductImagesDialogComponent} from "../show-product-images-dialog/show-product-images-dialog.component";
import {ImageProcessingServiceService} from "../image-processing-service.service";
import {map} from "rxjs";

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit{
  productDetails: Product[]=[];
  displayedColumns: string[] = ['Id', 'Product Name', 'Price', 'Product Description','Product Category','Product SubCategory','Images','Edit','Delete'];
  constructor(private productService:ProductService ,public imagesDialog: MatDialog, private router:Router,
              private imageProcessingService : ImageProcessingServiceService) {
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  public getAllProducts(){
    this.productService.getAllProducts()
      .pipe(
        map((x: Product[],i)=> x.map((product:Product) => this.imageProcessingService.createImages(product))
        )
      )
      .subscribe(
      (resp:Product[]) =>{
        this.productDetails=resp;
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }
  deleteProduct(productId : number){
    this.productService.deleteProduct(productId).subscribe(
      (resp) =>{
          this.getAllProducts()
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }
  showImages(product:Product){
        this.imagesDialog.open(ShowProductImagesDialogComponent,{
          data:{
          images: product.productImages
        },
          height:'100%',
          width:'120%'
  });
  }
  updateProduct(productId : number){
      this.router.navigate(['/addNewProduct',{productId :productId}])
  }

}
