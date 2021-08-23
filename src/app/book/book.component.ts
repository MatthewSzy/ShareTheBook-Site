import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../_services/book.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  isLoggedIn!: boolean;
  userId!: any;
  bookId!: any;

  book: any;
  coverImage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService,
    private bookService: BookService
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.bookId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userId = user.id;
    }
    else {
      this.router.navigate(['../../account/login'], { relativeTo: this.route })
    }

    this.bookService.getBook(this.bookId).subscribe(
      response => {
        this.book = response;
        let bytes = 'data:image/jpeg;base64,' + this.book.coverImage;
        this.coverImage = this.sanitizer.bypassSecurityTrustUrl(bytes);
      },
      error => {

      }
    )
  }

  downloadPDF() {
    this.bookService.getBookFile(this.bookId).subscribe(
      response => {
        saveAs(response, `${this.book.title}.pdf`);
      },
      error => {
        
      }
    );
  }

  addToFavorite() {
    this.bookService.addToFavorite(this.userId, this.bookId).subscribe(
      response => {
        console.log(response);
      }
    )
  }
}


