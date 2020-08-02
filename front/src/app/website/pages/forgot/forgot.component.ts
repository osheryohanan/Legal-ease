import { Component, OnInit } from '@angular/core';
import { LawyerService } from './../../../services/api/lawyer.service';
import { UserService } from './../../../services/api/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { Subscription } from 'rxjs';
import { Validators, FormBuilder, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LoginUser, LoginLawyer } from 'src/app/stores/user/action.store';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  providers: [MessageService]
})
export class ForgotComponent implements OnInit {

  lawyer: boolean = false;
  toF: boolean = false;
  api: any;
  subs: Subscription[] = [];
  resetFormApp: FormGroup;
  sendReset: FormGroup;
  hide: boolean = true;
  dispatcherLogin;
  constructor(
    private lawyerservice: LawyerService,
    private messageService: MessageService,
    private userservice: UserService,
    private store: Store<{ user: any }>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.api = this.userservice;
    this.dispatcherLogin = LoginUser;

    this.subs.push(this.store.pipe(select('user')).subscribe(
      ((state) => {
        if (state && state.isAuthentified) {
          var returnUrl = this.route.snapshot.queryParams['return'] || '/';
          this.router.navigateByUrl(returnUrl);
        }
      })))
    this.resetFormApp = this.formBuilder.group({
      // password: ['', [Validators.required, Validators.minLength(6)],],
      email: ['', [Validators.required, Validators.email]],
      token: ['', [Validators.required, Validators.minLength(6)],],
      password: [null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        // CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/], { hasSpecialCharacters: true }),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)])
      ],
      confirmPassword: [null, Validators.compose([Validators.required])]
    },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      });
    this.sendReset = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.subs.push(this.route.queryParams.subscribe(params => {

      try {
        if (params['token']) {
          var decode = jwt_decode(params['token']);
          if (decode.exp < Date.now().valueOf() / 1000) throw 'Expired token';
          if (decode.email && decode.type) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(decode.email))) throw 'Invalid email';
            this.resetFormApp.controls['email'].setValue(decode.email);
            this.resetFormApp.controls['token'].setValue(params['token']);
            this.changeLU(decode.type);
            this.toF = true;
            //        return;
          }
          else
            throw new Error("Invalid token");
        }

      } catch (error) {
        setTimeout(() => {
          this.ToastService({ severity: 'error', summary: 'Token invalid', detail: 'Your token is not valid' })
        }, 1000);

      }
    }));
  }
  resetFormAppSub() {
    this.subs.push(
      this.api.ResetPassword(this.fresetFormApp.password.value, this.fresetFormApp.token.value).subscribe((res: any) => {
        if (res.status == 200)
          this.ToastService({ severity: 'success', summary: 'Success', detail: res.message });
        localStorage.setItem('token', res.token);
        this.store.dispatch(this.dispatcherLogin(null))
      },
        error => {
          this.ToastService({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
    )



  }
  sendResetSub() {
    this.subs.push(
      this.api.GenerateResetPassword(this.fsendReset.email.value).subscribe((res: any) => {
        if (res.status == 200)
          this.ToastService({ severity: 'success', summary: 'Success', detail: res.message });
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 1000);



      },
        error => {
          this.ToastService({ severity: 'error', summary: 'Error', detail: error.error.message });


        })
    )

  }
  get fresetFormApp() { return this.resetFormApp.controls; }
  get fsendReset() { return this.sendReset.controls; }

  ToastService({ severity, summary, detail }) {
    this.messageService.add({ severity, summary, detail });
  }
  changeLU(type) {
    switch (type) {
      case 'user':
        {
          this.api = this.userservice;
          this.lawyer = false;
          this.dispatcherLogin = LoginUser;

          break;

        }
      case 'lawyer':
        {
          this.api = this.lawyerservice;
          this.lawyer = true;
          this.dispatcherLogin = LoginLawyer;
          break;

        }


      default:
        break;
    }
  }
  ngOnDestroy() {
    this.subs.forEach(e => e.unsubscribe());
  }
}


class CustomValidators {
  constructor(parameters) {

  }
  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }

  }
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }
}
