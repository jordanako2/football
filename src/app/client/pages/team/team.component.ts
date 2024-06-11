import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.sass'
})
export class TeamComponent {
  selectedImage: File | null = null;
  imagePath: string | null = null;
  teamForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _configService: ApiService,
  ) {
    this.teamForm = this._fb.group({
      file_name: '',
      team: '',
      coach: '',
      place: '',
    })
  }

  ngOnInit(): void {
    this.imagePath = `${this._configService.URL_IMAGE}no_image.jpg`;
  }

  onFileSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];
    if (this.selectedImage) {
      this.teamForm.patchValue({
        file_name: this.selectedImage.name 
      });
    }
  }
}
