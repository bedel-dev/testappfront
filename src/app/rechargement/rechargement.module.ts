import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributeurRoutingModule } from './rechargement-routing.module';
import {  RechargementComponent } from './rechargement.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HttpClientModule } from '@angular/common/http';
import { SucessComponent } from './transactionsucess/sucess.component';
import { ErrorComponent } from './transactionerror/error.component';
@NgModule({
    declarations: [
        RechargementComponent,
        SucessComponent,
        ErrorComponent,
    ],
    imports: [
        CommonModule,
        DistributeurRoutingModule,
        MatSlideToggleModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        NgxIntlTelInputModule,
        ReactiveFormsModule,

    ]
})
export class RechargementModule {

}
