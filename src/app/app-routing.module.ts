import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {AuthGuard} from "./_auth/auth.guard";
import {AddNewProductComponent} from "./add-new-product/add-new-product.component";
import {ShowProductDetailsComponent} from "./show-product-details/show-product-details.component";
import {ProductResolveService} from "./product-resolve.service";
import {ProductViewDetailsComponent} from "./product-view-details/product-view-details.component";
import {CartComponent} from "./cart/cart.component";
import {BuyProductComponent} from "./buy-product/buy-product.component";
import {RegisterComponent} from "./register/register.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

const routes: Routes = [
  {path: '',component:HomeComponent },
  {path: 'admin',component:HomeComponent , canActivate:[AuthGuard], data:{roles:['Admin']} },
  {path: 'user',component:HomeComponent , canActivate:[AuthGuard], data:{roles:['User']} },
  {path: 'login',component:LoginComponent  },
  {path: 'forbidden',component:ForbiddenComponent },
  {path:'addNewProduct',component:AddNewProductComponent, canActivate:[AuthGuard], data:{roles:['Admin']},
    resolve:{
    product:ProductResolveService
    }
  },
  {
    path: 'showProductDetails',
    component: ShowProductDetailsComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin']}

  },
  {path: 'productViewDetails',component:ProductViewDetailsComponent ,
    resolve:{
      product:ProductResolveService
    }},
  {path: 'cart',component:CartComponent,
    resolve:{
      product:ProductResolveService
    } },
  {path: 'buyProduct',component:BuyProductComponent },
  {path: 'register',component:RegisterComponent },
  {path: 'updateProfile',component:EditProfileComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
