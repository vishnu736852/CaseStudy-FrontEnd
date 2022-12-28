import {Component, HostListener, OnInit} from '@angular/core';
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";
import {ProductService} from "../_services/product.service";
import {CartService} from "../_services/cart.service";
import {Cart} from "../_model/cart.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public showMe:boolean =false;
  public searchTerm !:string;
  // isLoggedInFlag : boolean = false ;
  loggedInUserId  =this.userAuthService.getUserId();
  loggedInUserName =this.userAuthService.getUserName();
  cartByUserId ?:Cart ;
  searchResults: any[] = [];

  public totalItem:number=0;
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event:any): void {
    if (event.showMe)
      this.showMe = false;
  }
  constructor(
    private userAuthService:UserAuthService,
    private router:Router,
    public productService:ProductService,
    public cartService:CartService,

) {
  }
  ngOnInit(): void {
    this.getCartByUserid();
  }
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    // this.router.navigate(['/']);
    window.location.href='./'
  }
  public updateProfile(){
    // this.router.navigate(['/updateProfile'])
    window.location.href='./updateProfile'

  }
  public orderHistory(){
    window.location.href='./buyProduct'
  }

  public isAdmin(){
   return  this.userAuthService.isAdmin();
  }
  public isUser(){
   return  this.userAuthService.isUser();
  }
  public check(){
    console.log("working")
  }
  clearSearchResults() {
    this.searchResults = [];
  }

  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    if (this.searchTerm.length>2) {
      this.productService.search.next(this.searchTerm);
    }else {
      this.clearSearchResults();
    }
  }

  public getCartByUserid() {
    if (this.loggedInUserId!=0) {
      this.cartService.getCart(this.loggedInUserId).subscribe(
        (response: Cart) => {
          this.cartByUserId = response;
          if (this.cartByUserId && this.cartByUserId.cartItem) {
            // console.log(this.cartByUserId)
            // console.log(this.cartByUserId.cartItem[0]?.product)
            this.totalItem = response.cartItem.length;
          }
        }, (error) => {
          console.log(error)
        }
      )
    }
  }
  toggleMenu(){
    this.showMe = !this.showMe;
  }

}
