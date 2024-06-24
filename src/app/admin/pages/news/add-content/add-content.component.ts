import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CoreService } from '../../../../core/core.service';
import { ContentsService } from '../../../../services/contents.service';
import { ApiService } from '../../../../services/api.service';

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
  contentId: number | null = null;

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private _contService: ContentsService,
    private _configService: ApiService,
    private _coreService: CoreService,
    private _router: Router
  ) {
    this.contentForm = this._fb.group({
      title: '',
      description:'',
      content: '',
      status: '',
      block: '',
      file_name: '',
    })
  }

  ngOnInit(): void {
    this.contentForm = this._fb.group({
      file_name: '',
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      content: '',
      status: ['', [Validators.required, Validators.minLength(3)]],
      block: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.route.params.subscribe(params => {
      this.contentId = +params['id'];
      if (this.contentId) {
        this.loadContent(this.contentId);
      }
    });
  }

  loadContent(contentId: number) {
    this._contService.getContentById(contentId).subscribe({
      next: (res: any) => {
        this.contentForm.patchValue(res);
        if (res.file_name) {
          this.imagePath = `${this._configService.URL_CONTENT_IMAGE}${res.file_name}`;
          console.log(this.imagePath)
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];
    if (this.selectedImage) {
      this.contentForm.patchValue({
        file_name: this.selectedImage.name
      });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onUpload() {
    if (this.selectedImage) {
      this._contService.uploadImage(this.selectedImage).subscribe({
        next: (res: any) => {
          this.imagePath = `${this._configService.URL_CONTENT_IMAGE}${res.imagePath}`;
          this.contentForm.patchValue({
            file_name: res.imagePath
          });
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }

  onSubmit() 
  {
    if (this.contentForm.valid) {
      this.contentForm.markAllAsTouched();
      if (this.contentId) {
        this._contService.updateContent(this.contentId, this.contentForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Content updated successfully')
            this.onUpload(); 
            this._router.navigate(['/admin/contents']);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this.contentForm.markAllAsTouched();
        this._contService.addContent(this.contentForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Content added successfully')
            this.onUpload()
            this._router.navigate(['/admin/contents']);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
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
