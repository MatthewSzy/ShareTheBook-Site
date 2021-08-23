import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { RolesComponent } from './roles/roles.component';
import { YourBooksComponent } from './your-books/your-books.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'registration', component: RegistrationComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'roles', component: RolesComponent },
            { path: 'addBook', component: AddBookComponent },
            { path: 'yourBooks', component: YourBooksComponent },
        ]
    },
    { path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }