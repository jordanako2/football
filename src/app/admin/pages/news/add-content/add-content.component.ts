import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CoreService } from '../../../../core/core.service';
import { ContentsService } from '../../../../services/contents.service';

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    CommonModule, 
    MatSelectModule,
    QuillModule,
    FormsModule,
    MatIconModule,
    RouterLink

  ],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.sass'
})
export class AddContentComponent {
  selectedImage: File | null = null;
  imagePath: string | null = null;
  contentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _contService: ContentsService,
    private _coreService: CoreService,
  ) {
    this.contentForm = this._fb.group({
      title: '',
      description:'',
      content: '',
    })
  }
  onFileSelected(event: any) {
    // this.selectedImage = <File>event.target.files[0];
    // if (this.selectedImage) {
    //   this.teamForm.patchValue({
    //     file_name: this.selectedImage.name 
    //   });
    // }
  }

  onSubmit() 
  {
      this._contService.addContent(this.contentForm.value).subscribe({
        next: (val: any) => {
          console.log('added successfully');
          this._coreService.openSnackBar('Content added successfully!');
        },
        error:(err: any) => {
          console.log(err);
        },
      });
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
