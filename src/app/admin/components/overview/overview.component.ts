import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { TeamAboutService } from '../../../services/team-about.service';
import { CoreService } from '../../../core/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [QuillModule, CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.sass'
})
export class OverviewComponent {

  contentForm: FormGroup;
  teamId: number | null = null;
  aboutData: any | null = null;

  constructor (
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private teamAboutService: TeamAboutService,
    private _coreService: CoreService,
  ) {
    this.contentForm = this._fb.group({
      team_id: '',
      desktop_content: '',
      mobile_content: '',
      status: '',
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];
      if (this.teamId) {
        this.getTeamAboutByTeamId(this.teamId);
        this.contentForm = this._fb.group({
        team_id: this.teamId,
        desktop_content: '',
        mobile_content: '',
        status: ['', [Validators.required]],
      });
      }
    });
  }

  getTeamAboutByTeamId(teamId: number) {
    this.teamAboutService.getTeamAboutByTeamId(teamId).subscribe({
      next: (res) => {
        this.contentForm.patchValue(res);
        this.aboutData = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
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
  
      // ['link', 'image', 'video']                         // link and image, video
    ]
  };

  mobile_modules = {
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
  
      // ['link', 'image', 'video']                         // link and image, video
    ]
  };

  onSubmit() {
    if (this.contentForm.valid) {
      this.contentForm.markAllAsTouched();
      console.log(this.contentForm.value)
      if (this.aboutData) {
        this.teamAboutService.updateTeamAbout(this.aboutData.id, this.contentForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Team about updated successfully')
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this.contentForm.markAllAsTouched();
        this.teamAboutService.addTeamAbout(this.contentForm.value).subscribe({
          next: (val: any) => {
            if (this.teamId) {
              this._coreService.openSnackBar('Team about added successfully')
              this.getTeamAboutByTeamId(this.teamId);
            }
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }
  }
}
