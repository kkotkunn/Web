import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ServicesComponent } from './services/services.component';
import { CommentsComponent } from './comments/comments.component';
import { ContactsComponent } from './contacts/contacts.component';
import { Routes, RouterModule } from '@angular/router';
const appRoutes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
    data: { title: 'Главная' }
    },
    {
    path: 'services',
    component: ServicesComponent,
    data: { title: 'Услуги' }
    },
    {
    path: 'comments',
    component: CommentsComponent,
    data: { title: 'Отзывы' }
    },
    {
    path: 'contacts',
    component: ContactsComponent,
    data: { title: 'Контакты' }
    },
  
    //{ path: '**', component: PageNotFoundComponent }
    ];
    @NgModule({
    declarations: [
    AppComponent,
    LandingComponent,
    ServicesComponent,
    CommentsComponent,
    ContactsComponent
  ],
  imports: [
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <— debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }






    