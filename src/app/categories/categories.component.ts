import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../productservice.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  prodDetailsItems=[]
  constructor(private ps:ProductsService,private router:Router,private ar:ActivatedRoute) { }
  
  ngOnInit(): void {
    let category = this.ar.snapshot.params.category;
    console.log("the category is:-"+category)
    this.ps.getProductsByCategories(category).subscribe(
      res=>
       {
         this.prodDetailsItems=res.message;
         console.log(this.prodDetailsItems)
       },
       err=>
       {
         alert(err.message)
         console.log("errrrrrrrrrrrrrrrrrrrrrrrrr in categories.component.ts",err.message)
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
