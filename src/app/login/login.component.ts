import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'];
    });
   }

  ngOnInit(): void {
  }

  loginForm: FormGroup;
  userToken: string | undefined;
  TOKEN_KEY = 'token';
  returnUrl: string | undefined;

  onLogin() {
    if (this.loginForm.valid) {
      // if (this.service.logIn(this.loginForm.value)) {
      //   this.router.navigateByUrl('/' + this.returnUrl);
      // }
      this.service.logIn(this.loginForm.value);
    }
  }

  onLogout() {
    if (this.service.isAuthenticated) {
      this.router.navigateByUrl('/');
    }
  }

  get isUserAuthenticated() {
    return this.service.isAuthenticated;
  }
  
}
