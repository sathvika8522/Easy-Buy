import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../model/productInterface.model';
import { ProductsService } from '../productservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  prodDetailsItems=[]
  constructor(private ps:ProductsService,private router:Router) { }

  ngOnInit(): void 
  {
    this.ps.getProducts().subscribe
    (
       res=>
       {
         this.prodDetailsItems=res.message;
         console.log(this.prodDetailsItems)
       },
       err=>
       {
         alert(err)
         console.log("errrrrrrrrrrrrrrrrrrrrrrrrr in products.component.ts",err.message)
       }

    )
  }

  openDetails(ind)
  {
    console.log("the id is ;))))))))))))  ",ind);
    this.ps.id=ind
    this.router.navigateByUrl('productsway/'+ind)

  }

  
}