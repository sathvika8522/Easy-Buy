import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable } from 'rxjs'; 
import { product } from './model/productInterface.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  datasource = new BehaviorSubject<any>(1)
  dataObservable = this.datasource.asObservable()

  updateCartItemsIncrCount(data)
  {
    this.datasource.next(data)
  }


  constructor(private hc: HttpClient) { }

  id;
  
  /*get all products*/
  getProducts():Observable<any>
  {
    return this.hc.get("/products/getproducts")
  }

  /*get a specified product*/
  getProductsById(ind):Observable<any>
  {
    return this.hc.get("/products/getproducts/"+ind)
  }

  /*add to cart by username*/
  addToCartByUN(cartObject):Observable<any>
  {
    return this.hc.post("/cart/addtocart",cartObject)
  }

  /*getting products added to cart by user*/
  cartItemsByUN(username):Observable<any>
  {
    return this.hc.get('/cart/getCartItems/'+username)
  }

  /*getting products by specific categories*/
  getProductsByCategories(category):Observable<any>
  {
    return this.hc.get('/products/getProductsByCategory/'+category)
  }

  /*updating n.o of Items count*/
  updateCountToCartByUN(newCartObj):Observable<any>
  {
    return this.hc.put('/cart/updateCartItemsCount',newCartObj)
  }
}
