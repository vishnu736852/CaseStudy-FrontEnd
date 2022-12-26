import {Component, OnInit} from '@angular/core';
import {Product} from "../_model/product.model";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../_services/cart.service";
import {UserAuthService} from "../_services/user-auth.service";
import {CartItem} from "../_model/cartItem.model";

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{
  selectedProductIndex=0;
  user:any;
  product:Product ={
    productId:null,
    productName :"",
    productDescription:"",
    productCategory:"",
    productSubCategory:"",
    productPrice:0,
    productImages:[]

  };
  public productList:any;

   loggedInUserId  =this.userAuthService.getUserId();

  constructor(private activatedRoute: ActivatedRoute,
              private cartService:CartService,
              private userAuthService :UserAuthService,
              ) {
  }
  ngOnInit() :void{
    this.product= this.activatedRoute.snapshot.data['product'];
    // console.log(this.product)

  }
  changeIndex(index:number){
    this.selectedProductIndex = index;
  }

  addToCart(userId:number,productId:any){
    this.cartService.addToCart(userId,productId).subscribe(
      (response:CartItem)=>{
        window.location.reload();

      },(error) => {
        console.log(error);
      }
      )
    // console.log("added to cart");
  }
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }


}
