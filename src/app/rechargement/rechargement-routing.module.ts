import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RechargementComponent } from './rechargement.component';
import { ErrorComponent } from './transactionerror/error.component';
import { SucessComponent } from './transactionsucess/sucess.component';

const routes: Routes = [
  { path: '', component: RechargementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributeurRoutingModule { }
