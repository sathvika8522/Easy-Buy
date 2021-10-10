import { Component, Input, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../model/productInterface.model';
import { ProductsService } from '../productservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private ps:ProductsService,private router:Router) { }
   
  ind=this.ps.id;
  requiredProduct:any = <any>{} ;
  ngOnInit(): void {
    this.ps.getProductsById(this.ind).subscribe(
      res=>
      {
          this.requiredProduct=res.message;
          console.log(this.requiredProduct)
      },
      err=>
      {
        alert(err)
      }
    )
  }

  //add to cart function
  addToCart()
  {
    if(localStorage.getItem('username')!==null)
    {
      let un=localStorage.getItem('username')
      let cartObject={username:un,productObj:this.requiredProduct}
      this.ps.addToCartByUN(cartObject).subscribe(
        res=>
        {
          alert(res.message)
          console.log(res.message)
        },
        err=>
        {
          alert("err in product-details.comp.ts is :  "+err.message)
        }
      )
    }
    else
    {
      this.router.navigateByUrl('/register');
      alert('please register to add the product into cart')
    }
  }



}
