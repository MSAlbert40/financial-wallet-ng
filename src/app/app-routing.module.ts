import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./security/views/login/login.component";
import {SignupComponent} from "./security/views/signup/signup.component";
import {AppComponent} from "./app.component";
import {EnterpriseComponent} from "./security/views/enterprise/enterprise.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ConfigOperationComponent} from "./dashboard/config-operation/config-operation.component";
import {OperationComponent} from "./dashboard/operation/operation.component";
import {WalletComponent} from "./dashboard/wallet/wallet.component";
import {WalletDetailComponent} from "./dashboard/wallet/wallet-detail/wallet-detail.component";

const routes: Routes = [
  { path: 'Home', component: AppComponent },
  { path: 'LogIn', component: LoginComponent },
  { path: 'SignUp', component: SignupComponent },
  { path: 'Enterprise', component: EnterpriseComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Configuration', component: ConfigOperationComponent },
  { path: 'Operation', component: OperationComponent },
  { path: 'Wallet', component: WalletComponent },
  { path: 'Wallet-Detail', component: WalletDetailComponent },
  { path: '', redirectTo: 'Home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
