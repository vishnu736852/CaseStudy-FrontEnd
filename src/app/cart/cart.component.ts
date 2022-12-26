import {Component, OnInit} from '@angular/core';
import {Product} from "../_model/product.model";
import {CartService} from "../_services/cart.service";
import {UserAuthService} from "../_services/user-auth.service";
import {Cart} from "../_model/cart.model";
import {map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../_services/product.service";
import {ImageProcessingServiceService} from "../image-processing-service.service";
import {CartItem} from "../_model/cartItem.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BuyProductService} from "../_services/buy-product.service";
import {Order} from "../_model/order.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  // productDetails: Product[]=[];
    product?:Product ={
    productId:null,
    productName :"",
    productDescription:"",
    productCategory:"",
    productSubCategory:"",
    productPrice:0,
    productImages:[]

  };
  loggedInUserId  =this.userAuthService.getUserId()
  cartByUserId?:Cart;
  // cartByUserId ={
  //   cartId:0,
  //   cartItem:{
  //     cartItemId:0,
  //     quantity:0,
  //     product:{
  //       productId:null,
  //       productName :"",
  //       productDescription:"",
  //       productCategory:"",
  //       productSubCategory:"",
  //       productPrice:0,
  //       productImages:[]
  //     }
  //   }
  // }

  // initialQuantity :number =0;
  activatingDeleteButton:boolean =false;

  grandTotalProducts? : number = 0;
  // totalPrice: number = this.cartByUserId?.cartItem.reduce((acc, p) => acc + p.product.productPrice, 0) || 0;
  constructor(private cartService:CartService,
              private userAuthService :UserAuthService,
              private productService:ProductService,
              private imageProcessingService : ImageProcessingServiceService,
              private router:Router,
              private buyProductService : BuyProductService,
              private activatedRoute :ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.product= this.activatedRoute.snapshot.data['product'];
    this.getCartByUserid();
     // cartId :number = this.cartByUserId?.cartId
    // this.getAllProducts();
  }


 public getCartByUserid(){
    let sum : number = 0;

    this.cartService.getCart(this.loggedInUserId).subscribe(
      (response:Cart)=>{
          this.cartByUserId = response;
          let length = this.cartByUserId?.cartItem?.length;
          for(let i = 0; i < length; i++ ){
            sum += this.cartByUserId?.cartItem[i].product.productPrice * this.cartByUserId?.cartItem[i].quantity
console.log(            this.cartByUserId?.cartItem[i].product
)          }
          this.grandTotalProducts = sum;
      },(error)=>{
        console.log(error)
      }
    )
 }

 // activateDeleteButton(){
 //    this.activatingDeleteButton;
 // }

 removeItem(productId:any){
    this.cartService.removeItem(this.loggedInUserId,productId).subscribe(
      (resp:String)=>{
        alert( "item removed");
        console.log(resp);
        window.location.reload();
   },error => {
        window.location.reload();
        console.log(error)
      }
    )
 }

  increaseQuantity(productId:any){
    this.cartService.increaseQuantity(this.loggedInUserId,productId).subscribe(
      (resp:CartItem)=>{
        // alert("product quantity increased")
        window.location.reload();
      },error => {
        alert("something went wrong")
        console.log(error)
      }
    )
  }

  decreaseQuantity(productId:any){
  this.cartService.decreaseQuantity(this.loggedInUserId,productId).subscribe(
    (resp:CartItem)=>{
        // alert("product quantity decreased")
      window.location.reload();
    },error => {
      console.log(error)
    }
  )
  }

  buyProduct(){
      this.buyProductService.createOrder(this.loggedInUserId).subscribe(
        (resp:Order)=>{
          alert("oder created")
          window.location.reload();
          console.log(resp)
        },error=>{
          console.log(error)
    }
      )
  }

  // getProductsByCartId(){
  //
  // }



  // public getAllProducts(){
  //   this.productService.getAllProducts()
  //     .pipe(
  //       map((x: Product[],i)=> x.map((product:Product) => this.imageProcessingService.createImages(product))
  //       )
  //     )
  //     .subscribe(
  //       (resp:Product[]) =>{
  //         this.productDetails=resp;
  //         console.log(this.productDetails)
  //         this.productDetails.forEach((a :any)=>{
  //           }
  //         )},
  //       (error:HttpErrorResponse)=>{
  //         console.log(error);
  //       }
  //     );
  // }
}
