import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BookService } from './_services/book.service';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, startWith} from 'rxjs/operators';
import { Byte } from '@angular/compiler/src/util';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface Element {
  bookId: number;
  title: string;
  author: string;
  coverImage: Byte[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ShareTheBook';

  isLoggedIn!: boolean;
  isAdmin!: boolean;
  id!: string;
  username!: string;
  roles: string[] = [];
  image: any;

  elementCtrl = new FormControl();
  elementResponse!: Element[];
  elementData!: Observable<Element[]>;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private bookService: BookService
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      const userData = this.tokenStorageService.getUser();
      this.id = userData.id;
      this.username = userData.username;
      this.roles = userData.roles;
      this.image = userData.image;

      if (this.roles[1] == "ROLE_ADMIN") this.isAdmin = true;
      if (this.roles[0] == "ROLE_ADMIN") this.isAdmin = true;

      this.userService.getProfileImage(this.id).subscribe(
        response => {
          let imageBytes = 'data:image/jpeg;base64,' + response.profileImage;
          this.image = this.sanitizer.bypassSecurityTrustUrl(imageBytes);
        },
        error => {
          this.image = undefined;
        }
      )
    }

    this.bookService.getAllBooksSearch().subscribe(
      response => {
        this.elementResponse = response;
        this.elementData = this.elementCtrl.valueChanges
        .pipe(
          startWith(''),
          map(element => element ? this.filterElement(element) : this.elementResponse.slice())
        )
      }
    )
  }

  filterElement(value: string): Element[] {
    const filterValue = value.toLowerCase();
    return this.elementResponse.filter(element => element.title.toLowerCase().indexOf(filterValue) === 0);
  }

  coverConvert(coverImage: any): any {
    let bytes = 'data:image/jpeg;base64,' + coverImage;
    return this.sanitizer.bypassSecurityTrustUrl(bytes);
  }

  resetValue(optVal: any, trigger: MatAutocompleteTrigger, auto: MatAutocomplete) {
    this.elementCtrl.reset('');
  }

  routeToBook(id: number) {
    this.router.navigate([`books/${id}`], { relativeTo: this.route })
      .then(() => {
        window.location.reload();
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
