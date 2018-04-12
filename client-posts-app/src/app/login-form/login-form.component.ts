import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private user: UserService) { }

  ngOnInit() {
  }
  loginUser(e) {
    e.preventDefault();
    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    // console.log(`username: ${username}, password: ${password}`);
    const req = this.http.post('http://localhost:3000/api/signup', {
      username: username,
      password: password
    }).subscribe((res) => {
      // console.log(res['data']);
      this.user.setUserId(res['data']['_id']);
      this.user.setUsername(res['data']['username']);
      this.user.setUserLoggedIn();
      this.router.navigate(['dashboard']);
    }, (err) => {
      console.log(err);
    }
  );
  }
}
