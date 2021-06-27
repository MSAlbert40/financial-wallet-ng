import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./security/views/login/login.component";
import {SignupComponent} from "./security/views/signup/signup.component";
import {AppComponent} from "./app.component";
import {EnterpriseComponent} from "./security/views/enterprise/enterprise.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: 'Home', component: AppComponent },
  { path: 'LogIn', component: LoginComponent },
  { path: 'SignUp', component: SignupComponent },
  { path: 'Enterprise', component: EnterpriseComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'Home', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
