import { reloadData } from './../../../stores/user/action.store';
import { LawyerService } from './../../../services/api/lawyer.service';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api/';
import { ToastrService } from 'ngx-toastr';
import swal from "sweetalert2";
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class ValidatorService {
  constructor() { }
  minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {

        if (c.value.length >= min)
            return null;

        return { 'minLengthArray': {valid: false }};
    }
}

}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[ValidatorService]
})
export class ProfileComponent implements OnInit {
  model: NgbDateStruct;
  auth: Subscription;
  user: any;
  userForm: FormGroup;
  submited: boolean=false;
  cateE:boolean=false;
  category:Array<any>;

  constructor(private validationService:ValidatorService,private store:Store<{user:any}>,private formBuilder: FormBuilder,public toastr: ToastrService,public lawyerService:LawyerService) {
      this.lawyerService.category().subscribe((arg:Array<any>) => {this.category = arg;this.getdata()});

   }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required,]],
      lastname: ['', [Validators.required,],],
      birstday: ['', [],],
      phone: ['', []],
      companyPhone: ['', []],
      lawyerNum: ['', [Validators.required]],
      email:[{value: '', disabled: true}],
      address:['',[]],
      morInfo:['',[]],
      category:['',[this.validationService.minLengthArray(1)]],
    });





  }
  getdata(){
    this.auth = this.store.pipe(select('user')).subscribe(
      ((state) => {
        if (state && state.isAuthentified) {
          this.user=state.user;


          // let cate=this.category.filter((user)=>{
          //   let ids=this.user.category.map(x=>x._id)
          //   if(user._id in ids)return true;return false;
          // },{})

          this.userForm.patchValue({
            firstname:this.user.firstname,
            lastname:this.user.lastname,
            birstday:this.user.birstday||'',
            phone:this.user.phone||'',
            email:this.user.email||'',
            companyPhone:this.user.companyPhone||'',
            lawyerNum:this.user.lawyerNum||'',
            address:this.user.address||'',
            morInfo:this.user.morInfo||'',
            category:this.user.category||''



          })
        }
      }));
  }
  submit(){
    this.submited=true;
    // console.log(this.userForm.getRawValue());return;
    var form=this.userForm.getRawValue();
    // delete form.category;
    if(this.userForm.valid){
      this.lawyerService.update(form).subscribe((data:any)=>{
        swal.fire({
          title: "Saved!",
          text: "We saved the changes!",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
        });
        this.store.dispatch(reloadData())

      },
      error=>{
        console.error(error);

      })
      return;
    }
    this.toastr.error(
      '<span class=" tim-icons icon-bell-55"></span> Please Complete all field</b>',
      "",
      {
        timeOut: 899000,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-" + 'top' + "-" + 'right'
      }
    );
    console.log(this.userForm.getRawValue());

  }
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;


  }

  get form() {
    return this.userForm.controls;
  }
  get name(){
    return this.user? capitalizeFirstLetter(this.user.firstname) +' '+ capitalizeFirstLetter(this.user.lastname): 'Unknown'

  }
  get profileImg(){
    if (!this.user) return 'assets/img/profile.png';
    return this.user.imagePath? this.user.imagePath : 'assets/img/profile.png'
  }
  get description(){
    if (!this.user) return '';
    return this.user.morInfo? this.user.morInfo : ''
  }

}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

