import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, Subscription} from 'rxjs';
//*ngIf="affichefrai&&!recharge"
@Component({
  selector: 'app-distributeur',
  templateUrl: './rechargement.component.html',
  styleUrls: ['./rechargement.component.css']
})
export class RechargementComponent implements OnInit {

  // Create form group for formulary  inputs
  FormOperator :  FormGroup;

  constructor(private route: Router,private http: HttpClient,private router: ActivatedRoute,private changeDetector: ChangeDetectorRef) {

    //add specification for formulary inputs
    this.FormOperator = new FormGroup({
      contact_operation : new FormControl(null,[Validators.required]),
      operator: new FormControl(null,[Validators.required]),
      amount: new FormControl(null,[Validators.required]),
    })
  }
  ngOnInit(): void {


  }

  //Get field data
  get GetFormOperatorValue() {
    return this.FormOperator.controls;
  }



  // create indicatif input begin
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  selectedCountryISO:any
  preferredCountries: CountryISO[] = [CountryISO.CôteDIvoire,CountryISO.France];
  // create indicatif input end


  choixModePaiement = "false";
  step='';
  choixOperator:String = "";
  clientNumber:String = " ";
  amount:number = 0

  
  //choice methode  paiement and go to next step  
  choiceModePaiement(data:any){
    this.choixModePaiement=="false"?this.choixModePaiement = "true":this.choixModePaiement = "false";
    if(this.choixModePaiement=="true")
    this.choixOperator = data;
    this.FormOperator.controls['operator'].setValue(this.choixOperator, {onlySelf: true});
  }


  error_tel = false;
  error_tel_mtn = false;

  //change operator
  changeOperator(data?:any){
    this.choixOperator = data.value;
  }


  // listen input for change
  listenInput(data:any,type:String){
    type =="contact"?this.clientNumber = data.value:this.amount=parseInt(data.value);
  }



  isLoading = false;
  mySubscription: any;

}
