import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../productservice.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private ps:ProductsService, private router:Router,private us:UserService) { }
  count=1
  cart:any=<any>{}
  cartProducts=[]
  ngOnInit(): void {
    this.us.userloginstatus=true
    let un = localStorage.getItem('username')
     this.ps.cartItemsByUN(un).subscribe(
       res=>
       {
         this.cart=res.message
         this.cartProducts=this.cart.products
         //this.ps.updateCartItemsIncrCount(this.cart.products)
       },
       err=>
       {
         alert("err in cart.component.ts "+err.message)
       }
       
     )

  }

  openProductDetails(ind)
  {
    this.ps.id=ind
    this.router.navigateByUrl('productsway/'+ind)
  }

  addItem(product)
  {
    this.count++   
  }
  
  removeItem(ind)
  {
    this.count--
  }

  openPayementComp()
  {
    this.router.navigateByUrl('/payment')
  }

}
