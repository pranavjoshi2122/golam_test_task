import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './admin/dashboard/comments/comments.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PagesComponent } from './admin/dashboard/pages/pages.component';
import { PostsComponent } from './admin/dashboard/posts/posts.component';
import { SettingsComponent } from './admin/dashboard/settings/settings.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'admin',component:HomeComponent,
  children:[
    {path:"contracts",component:DashboardComponent},
    {path:"posts",component:PostsComponent},
    {path:"pages",component:PagesComponent},
    {path:"accounts",component:CommentsComponent},
    {path:"settings",component:SettingsComponent},
  ]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
