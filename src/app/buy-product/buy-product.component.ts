import {Component, OnInit} from '@angular/core';
import {Order} from "../_model/order.model";
import {HttpErrorResponse} from "@angular/common/http";
import {UserAuthService} from "../_services/user-auth.service";
import {BuyProductService} from "../_services/buy-product.service";

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{

  loggedInUserId  =this.userAuthService.getUserId()

  getOrdersByUserIdList? : Order[] ;
  grandTotalPrice? : number = 0;


  constructor(
    private userAuthService :UserAuthService,
    private buyProductService : BuyProductService

  ) {
  }
  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.buyProductService.getOrders(this.loggedInUserId).subscribe(
      (resp:Order[])=>{
        this.getOrdersByUserIdList = resp ;
        // console.log(resp)
      } ,  (error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }
}
