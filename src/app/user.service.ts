import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userloginstatus=false;
  constructor(private hc:HttpClient) { }
  
  //on registering we are submmiting the user data to database :)
  createuser(credentials):Observable<any>
  {
      return this.hc.post("/users/createusers",credentials)
  }

  //on login checking whether details are valid or not
  onlogin(credentials):Observable<any>
  {
    return this.hc.post("/users/login",credentials)
  }

  getusers(){}

  getuser(username){}

  updateuser(credentials){}

  deleteuser(username){}

  
  

}
