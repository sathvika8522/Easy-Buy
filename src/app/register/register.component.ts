import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:UserService , private router:Router) { }

  ngOnInit(): void {
  }

  file:File;
  selectFile(event)
  {
    this.file = event.target.files[0];
  }

  onregister(credentials)
  {
    /*----------form data obj-------------*/
    let formData = new FormData();
    formData.append("photo",this.file,this.file.name)
    formData.append("userobj",JSON.stringify(credentials))

    /*-------------------creating user with above credentials----------------*/
    this.us.createuser(formData).subscribe(
      res=>
      {
        if(res.message==="user created")
        {
          alert("successfully signed up :)")
          this.router.navigateByUrl("/login")
        }
        else{
          alert("this is from res err    "+res.message)
        }
      },
      err=>
      {
        console.log("errrrrrrrrr in registration  ",err)
        alert("errrrrrr in errrrr one"+err)
      }
    )
  }

}
