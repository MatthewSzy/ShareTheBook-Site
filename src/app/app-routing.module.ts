import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';

const accountModule = () => import('src/app/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'books/:id', component: BookComponent },

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
