import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "../../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../../core/services/authfake.service";

import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

import { environment } from "../../../../environments/environment";
import { QrService } from "src/app/core/services/qr.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  public incorrect = false;
  public msgErr = "";
  error = "";
  returnUrl: string;
  mpdCorrect: boolean;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authFackservice: AuthfakeauthenticationService,
    private Qr: QrService
  ) {}

  ngOnInit() {
    document.body.removeAttribute("data-layout");
    document.body.classList.add("auth-body-bg");

    this.loginForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    this.Qr.getLogin(this.f.password.value).subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        this.mpdCorrect = data.status == 200;
        if (this.loginForm.invalid) {
          return;
        } else {
          if (!this.mpdCorrect) {
            this.incorrect = true;
            this.msgErr = "Mot de passe incorrect !";
          } else {
            this.incorrect = false;
            this.msgErr = "Connection en cours ...";

            console.log(this.incorrect);
            this.authFackservice
              .login(this.f.password.value)
              .pipe(first())
              .subscribe((data) => {
                this.router.navigate(["/"]);
              });
          }
          console.log(this.msgErr + " " + this.incorrect);
        }
      },
      (error) => console.error(error)
    );
  }
}
