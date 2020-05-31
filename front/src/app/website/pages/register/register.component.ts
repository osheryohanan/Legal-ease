import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/api/user.service';
import { Store, select } from '@ngrx/store';
import { Login } from 'src/app/stores/user/action.store';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  registeUserForm: FormGroup;
  registeLawyerForm: FormGroup;
  lawyer: boolean = false;
  subs: Array<Subscription>=[];

  constructor(
    private authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private route: ActivatedRoute,
    private store: Store<{ user: any }>,
    private messageService: MessageService) {
    this.subs.push(this.store.pipe(select('user')).subscribe(
      ((state) => {
        if (state && state.isAuthentified) {
          var returnUrl = this.route.snapshot.queryParams['return'] || '/';
          this.router.navigateByUrl(returnUrl);
        }
      })));
    this.subs.push(this.authService.authState.subscribe((user) => {
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
    )

  }
  get fUser() { return this.registeUserForm.controls; }
  get fLawyer() { return this.registeLawyerForm.controls; }

  onUserSubmit() {

    if (this.registeUserForm.valid) {
      this.userservice.register(this.registeUserForm.getRawValue()).subscribe((user: any) => {
        if (user.token) {
          this.messageService.add({ severity: 'success', summary: user.type, detail: user.message });
          localStorage.setItem('token', user.token);
          this.store.dispatch(Login(null))
        }
      },
        error => {
          // console.error(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
          // console.clear();

        })
    }


  }
  onLawyerSubmit() {
    alert('under construction');
    console.log(this.fLawyer);


  }

  ngOnInit(): void {
    this.registeUserForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(6)]],
      lastname: ['', [Validators.required, Validators.minLength(6)],],
      email: ['', [Validators.required, Validators.email],],
      password: ['', [Validators.required, Validators.minLength(6)],],
      repassword: ['', [Validators.required, Validators.minLength(6)],],
      phone: ['', [Validators.required, Validators.minLength(6)],],
    },
      {
        validator: MustMatch('password', 'repassword')
      });
    this.registeLawyerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(6)]],
      lastname: ['', [Validators.required, Validators.minLength(6)],],
      email: ['', [Validators.required, Validators.email],],
      password: ['', [Validators.required, Validators.minLength(6)],],
      repassword: ['', [Validators.required, Validators.minLength(6)],],
      phone: ['', [Validators.required, Validators.minLength(6)],],
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  ngOnDestroy() {

    this.subs.forEach(elem=>elem.unsubscribe());
  }

}


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
