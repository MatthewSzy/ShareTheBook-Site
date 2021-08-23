import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';

import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'

import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { RolesComponent } from './roles/roles.component';
import { AddBookComponent } from './add-book/add-book.component';
import { YourBooksComponent } from './your-books/your-books.component';

const modules = [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule
]

@NgModule({
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegistrationComponent,
        ProfileComponent,
        RolesComponent,
        AddBookComponent,
        YourBooksComponent
    ],
    imports: [
        [...modules],
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    providers: [authInterceptorProviders],
})
export class AccountModule { }