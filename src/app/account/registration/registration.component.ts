import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  isLoggedIn!: boolean;
  roles = ["user"];
  hide = true;

  form!: FormGroup;

  invalidUsername = 'Podaj nazwę użytkownika!';
  invalidPassword = 'Podaj podać hasło!';
  invalidRepeatPassword = 'Powtórz hasło!';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      this.router.navigate(["**"], { relativeTo: this.route});
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) { return; }

    this.invalidUsername = 'Podaj nazwę użytkownika!';
    this.invalidPassword = 'Podaj hasło!';
    this.invalidRepeatPassword = 'Powtórz hasło!';

    if (this.f.password.value !== this.f.repeatPassword.value) {
      this.invalidRepeatPassword = 'Hasła muszą być takie same!';
      this.form.controls['repeatPassword'].setErrors({'incorrect': true});
      return;
    }

    this.userService.registration(this.f.username.value, this.f.password.value, this.roles).subscribe(
      response => {
        this.router.navigate(['../login'], { relativeTo: this.route});
      },
      error => {
        if(error.error.message == 'Nazwa użytkownika jest już zajęta!') {
          this.invalidUsername = error.error.message;
          this.form.controls['username'].setErrors({'incorrect': true});
        }
        else if(error.error.message == 'Nazwa użytkownika jest nie poprawna!') {
          this.invalidUsername = error.error.message;
          this.form.controls['username'].setErrors({'incorrect': true});
        }
        else if(error.error.message == 'Hasło jest nie poprawnę!') {
          this.invalidPassword = 'Podane hasło jest nie prawidłowe, musi ono zawierać 8 znaków, małą i wielką literę, cyfrę oraz znak specjalny.';
          this.form.controls['password'].setErrors({'incorrect': true});
        }
      }
    );
  }
}
