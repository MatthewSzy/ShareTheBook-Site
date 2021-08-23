import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn!: boolean;
  roles: string[] = [];
  hide = true;

  form!: FormGroup;

  invalidUsername = 'Podaj nazwę użytkownika!';
  invalidPassword = 'Podaj hasło!'

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
      this.router.navigate(['**'], { relativeTo: this.route })
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) { return; }
    this.invalidUsername = 'Podaj nazwę użytkownika!';
    this.invalidPassword = 'Podaj hasło!';

    this.userService.login(this.f.username.value, this.f.password.value).subscribe(
      response => {
        this.tokenStorageService.saveToken(response.token);
        this.tokenStorageService.saveUser(response);

        this.router.navigate(["**"], { relativeTo: this.route })
          .then(() => {
            window.location.reload();
          })
      },
      error => {
        if (error.error.message == "Bad credentials") {
          this.invalidUsername = "Mogłeś wpisać błędną nazwę użytkownika!";
          this.invalidPassword = "Mogłeś wpisać błędne hasło";
          this.form.controls['username'].setErrors({'incorrect': true});
          this.form.controls['password'].setErrors({'incorrect': true});
        }
      }
    );
  }
}
