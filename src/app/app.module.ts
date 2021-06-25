import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './security/views/login/login.component';
import { SignupComponent } from './security/views/signup/signup.component';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderInterceptor } from "./security/interceptors/header.interceptor";
import { EnterpriseComponent } from './security/views/enterprise/enterprise.component';
import { EnterpriseCardComponent } from './security/views/enterprise/enterprise-card/enterprise-card.component';
import { EnterpriseNewComponent } from './security/views/enterprise/enterprise-new/enterprise-new.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EnterpriseComponent,
    EnterpriseCardComponent,
    EnterpriseNewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [EnterpriseNewComponent]
})
export class AppModule { }
