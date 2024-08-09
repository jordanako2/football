import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../../services/page.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.sass'
})
export class PageComponent {
  data: any | null = null;
  imagePath: string | null = null;
  slug: string | null = null;
  content: SafeHtml  | null = null;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['params'];  
      if (this.slug) {
        this.getPagebySlug(this.slug);
      }
    });
  }

  setTitleAndMeta(title: string, description: string): void {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
  }

  getPagebySlug(slug: string) {
    this.pageService.getPagebySlug(slug).subscribe({
      next: (res) => {
        if (res.status == 'Published') {
          this.data = res;
          this.content = this.sanitizer.bypassSecurityTrustHtml(res.content);
          this.setTitleAndMeta(res.meta_title, res.meta_description);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
