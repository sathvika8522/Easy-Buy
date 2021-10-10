import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersdetails',
  templateUrl: './usersdetails.component.html',
  styleUrls: ['./usersdetails.component.css']
})
export class UsersdetailsComponent implements OnInit {
  
  constructor(private hc:HttpClient , private router:Router) { }

  ngOnInit(): void {

  }

  openUserCart()
  {
    let un=localStorage.getItem('username')
    if(un===null)
    {
      alert("please register to view cart")
      this.router.navigateByUrl('/register')
    }
    else
    {
      this.router.navigateByUrl('/addToCart')
    }
  }

}
