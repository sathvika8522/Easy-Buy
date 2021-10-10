import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { UsersdetailsComponent } from './usersdetails/usersdetails.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'productsway',component:ProductsComponent},
  {path:'productsway/:id',component:ProductDetailsComponent},
  {path:'addToCart',component:CartComponent},
  {path:'usersdetails',component:UsersdetailsComponent},
  {path:'categorise/:category',component:CategoriesComponent},
  {path:'payment',component:PaymentComponent},
  {path:'',redirectTo:'/home',pathMatch:"full"},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
