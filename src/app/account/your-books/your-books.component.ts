import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-your-books',
  templateUrl: './your-books.component.html',
  styleUrls: ['./your-books.component.css']
})
export class YourBooksComponent implements OnInit {

  isLoggedIn!: boolean;
  id!: string;

  books!: any;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private bookService: BookService
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const userData = this.tokenStorageService.getUser();
      this.id = userData.id;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route });
    }

    this.bookService.getFavoriteBooks(this.id).subscribe(
      response => {
        this.books = response;
      }
    )
  }

  convertCover(coverImage: any): any {
    let bytes = 'data:image/jpeg;base64,' + coverImage;
    return this.sanitizer.bypassSecurityTrustUrl(bytes);
  }
}
