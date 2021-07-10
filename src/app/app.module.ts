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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigOperationComponent } from './dashboard/config-operation/config-operation.component';
import { OperationComponent } from './dashboard/operation/operation.component';
import {MatTableModule} from "@angular/material/table";
import { WalletComponent } from './dashboard/wallet/wallet.component';
import { WalletDetailComponent } from './dashboard/wallet/wallet-detail/wallet-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EnterpriseComponent,
    EnterpriseCardComponent,
    EnterpriseNewComponent,
    DashboardComponent,
    ConfigOperationComponent,
    OperationComponent,
    WalletComponent,
    WalletDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule
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
