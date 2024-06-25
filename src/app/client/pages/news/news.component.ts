import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule,MatCardModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.sass'
})
export class NewsComponent {
  selectedImage: File | null = null;
  imagePath: string | null = null;
  dataSource: any[] = [];
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
    
  }

  onFileSelected(event: any) {
  }

  applyFilter(event: Event) {
  }
}
