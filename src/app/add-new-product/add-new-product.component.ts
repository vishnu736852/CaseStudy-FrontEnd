import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../_model/product.model";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ProductService} from "../_services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FileHandle} from "../_model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{
  isNewProduct :boolean =true ;
  productForm !: FormGroup;
  submitted=false ;
  product:Product={
    productId:null,
    productName :"",
    productDescription:"",
    productCategory:"",
    productSubCategory:"",
    productPrice:0,
    productImages:[]

}
  constructor(private productService:ProductService,private sanitizer:DomSanitizer,
              private activatedRoute:ActivatedRoute,private fb : FormBuilder) {
  }
  ngOnInit(): void {
   this.product= this.activatedRoute.snapshot.data['product']
    if(this.product && this.product.productId){
      this.isNewProduct=false;
    }
    this.productForm = this.fb.group({
      productName:['',Validators.required],
      productPrice:['',Validators.required],
      productDescription:['',Validators.required],
      productCategory:['',Validators.required],
      productSubCategory:['',Validators.required]
    })
  }


  // addProduct(productForm:NgForm){
  //   const productFormData = this.prepareFormData(this.product);
  //     this.productService.addProduct(productFormData).subscribe(
  //       (response:Product)=>{
  //             productForm.reset()
  //             this.product.productImages = []
  //       },
  //       (error:HttpErrorResponse)=>{
  //         console.log(error);
  //       }
  //     )
  // }
  addProduct(){
    this.submitted = true;
    if(this.productForm.valid) {
      const productFormData = this.prepareFormData(this.product);
      this.productService.addProduct(productFormData).subscribe(
        (response: Product) => {
          this.productForm.reset()
          this.product.productImages = []
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    }
  }
  prepareFormData(product :Product):FormData{
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type:'application/json'})
    );
    for(var i=0; i<product.productImages.length;i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }
    return formData;
  }

  onFileSelected(event: Event | null) {
    //@ts-ignore
    if(event.target.files){
      //@ts-ignore
      const file = event.target.files[0];

     const fileHandle: FileHandle ={
       file:file,
       url: this.sanitizer.bypassSecurityTrustUrl(
         window.URL.createObjectURL(file)
       )
     }
     this.product.productImages.push(fileHandle);
    }
    else {
      alert("wrong file")
    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i,1)
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}
