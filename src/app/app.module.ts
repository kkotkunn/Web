import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { InfoComponent } from './info/info.component';
import { UslugiComponent } from './uslugi/uslugi.component';
import { DoktorComponent } from './doktor/doktor.component';
import { CollectionComponent } from './collection/collection.component';
import { UslugisService } from './uslugi/uslugi.service'; 
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './shared/user.service';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { FilesComponent } from './files/files.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
 
const appRoutes: Routes = [
  { 
    path: 'home', 
    component: LandingComponent,
    data: { title: 'Главная' } 
  },
  { 
    path: 'info',  
    component: InfoComponent,
    canActivate:[AuthGuard], 
    data: { title: 'О сайте' }
  },
  
  { 
    path: 'files',   
    component: FilesComponent,
    canActivate:[AuthGuard], 
    data: { title: 'Файлы' }  
  },
  { 
    path: 'uslugi',  
    component: UslugiComponent,
    canActivate:[AuthGuard], 
    data: { title: 'Услуги' }
  },
  { 
    path: 'doktor',  
    component: DoktorComponent,
    canActivate:[AuthGuard], 
    data: { title: 'Доктор' }
  },
  { 
    path: 'collection',  
    component: CollectionComponent,
    canActivate:[AuthGuard], 
    data: { title: 'Коллекция' }
  },
  {
    path: 'signup', 
    component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', 
    component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  }      
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    InfoComponent,
    UslugiComponent,
    DoktorComponent,
    CollectionComponent,
    SignUpComponent,
    SignInComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    FilesComponent,
    FileSelectDirective
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [UslugisService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }