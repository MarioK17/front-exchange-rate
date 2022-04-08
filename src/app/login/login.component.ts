import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  controlUser: any;
  controlPassword: any;
  submited: boolean;
  returnUrl: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {

    this.formGroup = this.fb.group({});
    this.controlUser = "controlUser";
    this.controlPassword = "controlPassword"
    this.formGroup.addControl(this.controlUser, this.fb.control({value:''}));
    this.formGroup.addControl(this.controlPassword, this.fb.control({value:''}));
    this.formGroup.get(this.controlUser).setValue("");
    this.formGroup.get(this.controlPassword).setValue("");

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    console.log("submiting")
    let user = this.formGroup.get(this.controlUser).value;
    let pass = this.formGroup.get(this.controlPassword).value;
    this.submited = true;

    if(this.formGroup.invalid) {
      return;
    }

    this.authenticationService.login(user, pass)
      .pipe(first())
      .subscribe(
        data => {

          console.log("logeando")
          console.log(data);

          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log("error")
          console.log(error);

        });

  }

}
