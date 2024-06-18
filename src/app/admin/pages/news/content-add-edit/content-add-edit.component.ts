import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ContentsService } from '../../../../services/contents.service';
import { CoreService } from '../../../../core/core.service';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-content-add-edit',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    CommonModule, 
    MatSelectModule,
    QuillModule,
    FormsModule
  ],
  templateUrl: './content-add-edit.component.html',
  styleUrl: './content-add-edit.component.sass'
})
export class ContentAddEditComponent {
  contentForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _dialogRef: MatDialogRef<ContentAddEditComponent>,
    private _contService: ContentsService,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contentForm = this._fb.group({
      block_location:'',
      title: '',
      content: '',
    })
  }

  ngOnInit(): void {
      this.contentForm.patchValue(this.data);
    
  }

  onSubmit() 
  {if(this.contentForm.valid){
    if(this.data){
      this._contService.updateContent(this.data.id, this.contentForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Content updated!');
          this._dialogRef.close(true);
        },
        error:(err: any) => {
          console.log(err);
        },
      });
    }else{
      this._contService.addContent(this.contentForm.value).subscribe({
        next: (val: any) => {
          console.log('addded successfully');
          this._coreService.openSnackBar('Content added successfully!');
          this._dialogRef.close(true);
        },
        error:(err: any) => {
          console.log(err);
        },
      });
    }
  }
}
  modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting button

    ['link', 'image', 'video']                         // link and image, video
  ]
};
}
