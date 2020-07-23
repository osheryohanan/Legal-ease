import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { LawyerService } from 'src/app/services/api/lawyer.service';
import { Store } from '@ngrx/store';
import { reloadData } from 'src/app/stores/user/action.store';

@Component({
  selector: "app-picture-upload",
  templateUrl: "./picture-upload.component.html",
  styleUrls: ["./picture-upload.component.scss"]
})
export class PictureUploadComponent implements OnInit {
  @Input() avatar: boolean = false;
  @Input() image: string;
  @Output()  changeImageStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  file: any = {};
  imagePreviewUrl: any = {};
  @ViewChild("fileInput") fileInput: ElementRef;
  constructor(
    private lawyerService:LawyerService,
    private store:Store<{user:any}>,
  ) {
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  changeImageHandler(){
    this.changeImageStatus.emit(false);
  }

  ngOnInit() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== undefined
        ? this.image
        : this.avatar
        ? "assets/img/placeholder.jpg"
        : "assets/img/image_placeholder.jpg";
  }
  handleImageChange($event) {
    $event.preventDefault();
    let reader = new FileReader();
    let file = $event.target.files[0];
    reader.onloadend = () => {
      this.file = file;
      this.imagePreviewUrl = reader.result;

      const formData: FormData = new FormData();
      formData.append('photo', file);
      this.lawyerService.updateImage(formData).subscribe(
        (x:any)=>{
          if(x.success){
            this.store.dispatch(reloadData())
            this.changeImageHandler()
          }
        },
        e=>{console.error(e);
        }
      )


    };
    reader.readAsDataURL(file);


  }
  handleClick() {
    console.log(this.fileInput.nativeElement);
    this.fileInput.nativeElement.click();
  }
  handleRemove() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== undefined
        ? this.image
        : this.avatar
        ? "assets/img/placeholder.jpg"
        : "assets/img/image_placeholder.jpg";
    this.fileInput.nativeElement.value = null;
  }
  handleSubmit($event) {
    $event.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
}
