import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  booksListByTitle!: any;
  booksCoverListByTitle = new Array();

  booksListByAddDate!: any;
  booksCoverListByAddDate = new Array();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookService.getAllBooksByTitle().subscribe(
      response => {
        this.booksListByTitle = response;
        this.booksListByTitle.forEach((book: any) => {
          let bytes = 'data:image/jpeg;base64,' + book.coverImage;
          this.booksCoverListByTitle.push(this.sanitizer.bypassSecurityTrustUrl(bytes));
        });
      }
    )

    this.bookService.getAllBooksByAddDate().subscribe(
      response => {
        this.booksListByAddDate = response;
        this.booksListByAddDate.forEach((book: any) => {
          let bytes = 'data:image/jpeg;base64,' + book.coverImage;
          this.booksCoverListByAddDate.push(this.sanitizer.bypassSecurityTrustUrl(bytes));
        });
      }
    )
  }

}
