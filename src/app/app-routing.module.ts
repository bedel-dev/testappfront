import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucessComponent } from './rechargement/transactionsucess/sucess.component';
import { ErrorComponent } from './rechargement/transactionerror/error.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./rechargement/rechargement.module').then(m => m.RechargementModule)},
  { path: 'succes-transaction', component: SucessComponent},
  { path: 'error-transaction', component: ErrorComponent},
  { path: '**', redirectTo: 'error/404'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
