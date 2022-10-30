import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  public incorrect = false;
  public msgErr = '';
  error = '';
  returnUrl: string;
  mdp:any;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public authFackservice: AuthfakeauthenticationService, public http: HttpClient) {
    this.http.get('http://localhost:3000/ceramicauth').subscribe(data =>{
       this.mdp = data
       console.log(data)
      //  console.log(this.mdp);
     }, error=> console.error(error));
  }

  ngOnInit() {
    document.body.removeAttribute('data-layout');

    this.loginForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
console.log(this.f.password.value);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (this.f.password.value != this.mdp) {
        this.incorrect=true;
        this.msgErr = 'Mot de passe incorrect !'
    //     console.log("Connection...")
    //       return true;

      }else{
        this.incorrect = false
        this.msgErr = 'Connection en cours ...'

        console.log(this.incorrect);
        this.authFackservice.login().pipe(first()).subscribe(
          data => {
            this.router.navigate(['/']);
          }
        )

      }
      // console.log(this.mdp);
      console.log(this.msgErr+ ' ' +this.incorrect);

    // else{console.log("echec de la connection"); return false
    // }
    // }

    // if(this.onSubmit() === true){
    //   this.router.navigate(['/']);
    }
    // else {
    //     this.authFackservice.login(this.f.email.value)
    //       .pipe(first())
    //       .subscribe(
    //         data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

}
