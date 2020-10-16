import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  file: File;
  searchControl: FormControl;
  fileText = 'Click here to Browse file';
  resultValues: Array<string> = new Array<string>();

  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ) {

  }

  ngOnInit() {
    this.searchControl = this.fb.control(null);
  }

  fileInputChanged = (event: any) => {
    if (event && event.target &&
        event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      this.fileText = this.file.name;
    }
  }

  submitFile = () => {

    if (!this.file) {
      Swal.fire('', 'Please select a file and click upload!', 'warning');
      return;
    }

    const fd = new FormData();
    fd.append('file', this.file, this.file.name);
    Swal.showLoading();
    const uploadFileSub$ = this.appService.uploadFile(fd)
        .subscribe(
          (res: any) => {
            Swal.close();
            if (res && res.status && res.status === 200) {
              Swal.fire('Success', res.message ? res.message : 'Successfully uploaded file!', 'success');
            }
          },
          (err: any) => {
            Swal.close()
            Swal.fire(
              'Error', 
              err && err.error && err.error.message ? err.error.message : 'Something went wrong while uploading file', 
              'error'
            );
            uploadFileSub$.unsubscribe();
          }
        )
  }

  search = () => {
    if (this.searchControl && this.searchControl.value && this.searchControl.value.length) {
      this.resultValues = new Array<string>();
      const data: any = {
        searchStr: this.searchControl.value
      };
      const searchSub$ = this.appService.searchForKey(data)
          .subscribe(
            (res: any) => {
              Swal.close();
              if (res && res.status && res.status === 200) {
                if (res.body && res.body.length) {
                  this.resultValues = res.body;
                }
              }
            },
            (err: any) => {
              Swal.close()
              Swal.fire(
                'Error', 
                err && err.error && err.error.message ? err.error.message : 'Something went wrong while uploading file', 
                'error'
              );
              searchSub$.unsubscribe();
            }
          )
    }
  }
}
