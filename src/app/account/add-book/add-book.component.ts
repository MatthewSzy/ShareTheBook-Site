import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  form!: FormGroup;
  books!: any;
  categories = ["Fantasy", "Horror", "Przygodowe", "Romans", "Thriller"];
  selectedCategories = new Array();
  selectedBookId!: string;
  bookIdIsSelected: boolean = false;

  selectedCover!: File;
  selectedFile!: File;

  isLoggedIn!: boolean;

  invalidTitle = "Proszę podać tytuł!";
  invalidAuthor = "Proszę podać autora!";
  invalidReleaseDate = "Proszę podać date wydania!";
  invalidDescription = "Proszę podać opis!";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {

    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route });
    }

    this.bookService.getAllBooksTitle().subscribe(
      response => {
        this.books = response;
      }
    )
  }
  
  addBook() {
    if (this.form.invalid) { return; }
    this.invalidTitle = "Proszę podać tytuł!";
    this.invalidAuthor = "Proszę podać autora!";
    this.invalidReleaseDate = "Proszę podać date wydania!";
    this.invalidDescription = "Proszę podać opis!";

    this.bookService.addBook(this.form.controls.title.value, this.form.controls.author.value, this.form.controls.releaseDate.value, this.form.controls.description.value, this.selectedCategories).subscribe(
      response => {
        window.location.reload();
      },
      error => {

      }
    )
  }

  addFiles() {
    if (!this.selectedCover && !this.selectedFile) { return; }
    if (!this.bookIdIsSelected) { return; }

    this.bookService.addFile(this.selectedBookId, this.selectedCover, this.selectedFile).subscribe(
      response => {
        window.location.reload();
      },
      error => {

      }
    )
  }

  onCoverSelected(event: any) {
    this.selectedCover = <File>event.target.files[0];
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  addCategory(event: string) { this.selectedCategories.push(event); }

  removeCategory(event: string) { this.selectedCategories = this.selectedCategories.filter(x => x !== event); }

  getBookId(event: any) {
    this.selectedBookId = event.bookId;
    this.bookIdIsSelected = true;
  }
}
