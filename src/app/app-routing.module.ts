import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { GuardGuard } from './guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Role } from './model';
import { TitleResolver, CategoryResolver } from './resolver.resolver';
import { TitleComponent } from './title/title.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, resolve:{commentresolver:TitleResolver} },
  { path: 'title', component: TitleComponent, canActivate: [GuardGuard], data: { roles: [Role.Admin, Role.User] } },
  { path: 'title/:titleId', component: TitleComponent, canActivate: [GuardGuard], data: { roles: [Role.Admin, Role.User] } },
  { path: 'category', component: CategoryComponent, resolve:{commentresolver:CategoryResolver}, canActivate: [GuardGuard], data: { roles: [Role.Admin] } },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[TitleResolver, CategoryResolver]
})
export class AppRoutingModule { }
