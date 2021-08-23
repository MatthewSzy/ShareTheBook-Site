import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedFile!: File;
  form!: FormGroup;
  hide = true;

  isLoggedIn!: boolean;
  id!: string;
  username!: string;

  invalidUsername = 'Podaj nazwę użytkownika!';
  invalidPassword = 'Podaj hasło!'
  invalidPrint = false;
  invalidUpload = 'Błąd podczas przesyłania!';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const userData = this.tokenStorageService.getUser();
      this.id = userData.id;
      this.username = userData.username;

      this.form.patchValue(userData);
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  updateUsername() {
    if (this.form.invalid) { return; }
    this.invalidUsername = 'Proszę podać nazwę użytkownika!';

    this.userService.update(this.id, this.form.controls.username.value, this.form.controls.password.value).subscribe(
      response => {
        this.tokenStorageService.saveToken(response.token);
        this.tokenStorageService.saveUser(response);
        window.location.reload();
      },
      error => {
        this.invalidUsername = error.error.message;
        this.form.controls['username'].setErrors({'incorrect': true});
      }
    );
  }

  uploadProfileImage() {
      this.invalidPrint = false;
      this.userService.upload(this.id, this.selectedFile).subscribe(
        response => {
          window.location.reload();
        },
        error => {
          this.invalidUpload = error.error.message;
          this.invalidPrint = true;
        }
      )
  }

}
