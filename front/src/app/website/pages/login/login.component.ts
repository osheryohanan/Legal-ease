import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/api/user.service';
import { Store, select } from '@ngrx/store';
import { Login } from 'src/app/stores/user/action.store';
import { MessageService } from 'primeng/api/';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  auth: any;
  constructor(private authService: AuthService, private messageService: MessageService, private formBuilder: FormBuilder, private userservice: UserService, private store: Store<{ user: any }>, private router: Router, private route: ActivatedRoute, ) {
    this.auth = this.store.pipe(select('user')).subscribe(
      ((state) => {
        if (state && state.isAuthentified) {
          var returnUrl = this.route.snapshot.queryParams['return'] || '/';
          this.router.navigateByUrl(returnUrl);
        }
      }));
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)],],
      longtime: [false, [Validators.required],]
    });
    this.authService.authState.subscribe((user) => {
      if (user && user.idToken) {
        this.userservice.loginG(user.idToken).subscribe((user: any) => {
          if (user.token) {
            this.messageService.add({ severity: 'success', summary: user.type, detail: user.message });
            localStorage.setItem('token', user.token);
            this.store.dispatch(Login(null))
          }
        },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            console.error(error);

          })

        this.authService.signOut();


      }
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {


    if (this.loginForm.valid) {
      this.userservice.login(this.f.email.value, this.f.password.value).subscribe((user: any) => {
        if (user.token) {
          this.messageService.add({ severity: 'success', summary: user.type, detail: user.message });
          localStorage.setItem('token', user.token);
          this.store.dispatch(Login(null))
        }
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          console.error(error);

        })
    }

  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  ngOnDestroy() {
    // if (this._loginSubscription != null) {
    //   this._loginSubscription.unsubscribe();
    // }
    this.auth.unsubscribe();
  }


}
