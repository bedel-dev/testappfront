import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, Subscription} from 'rxjs';
import { RechargementService } from '../services/service-rechargement/rechargement-service.service';
//*ngIf="affichefrai&&!recharge"
@Component({
  selector: 'app-distributeur',
  templateUrl: './rechargement.component.html',
  styleUrls: ['./rechargement.component.css']
})
export class RechargementComponent implements OnInit {

  // Create form group for formulary  inputs
  FormOperator :  FormGroup;

  constructor(private rechargementService:RechargementService,private route: Router,private http: HttpClient,private router: ActivatedRoute,private changeDetector: ChangeDetectorRef) {

    //add specification for formulary inputs
    this.FormOperator = new FormGroup({
      contact_operation : new FormControl(null,[Validators.required]),
      operator: new FormControl(null,[Validators.required]),
      amount: new FormControl(null,[Validators.required]),
    })
  }
  ngOnInit(): void {
    this.getTokenTorequest()
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
  tokenRequest:string = "";
  TokenPayement:string = "";

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


  //Get First Token
  getTokenTorequest(){
    this.rechargementService.DoPostRequest("generateToken.json",{},"").subscribe((response:any)=>{
      if(response.response.code == 200){
        this.tokenRequest = response.response.access_token;
      }
    },error=>{
    },()=>{

    })
  }

  DoRechargment(){
    if(
      this.FormOperator.controls['contact_operation'].status !=="INVALID"&&
      this.FormOperator.controls['amount'].status!=="INVALID"
    ){
      this.error_tel = false;
      this.isLoading = true; 
      var data = {
        "payment_method": this.choixOperator,
        "amount": parseInt(this.FormOperator.controls['amount'].value),
        "designation": "charge wallet", 
        "client_first_name" : "John",
        "client_last_name" : "Doe",
        "client_phone_number" : this.FormOperator.controls['contact_operation'].value.e164Number,
        "client_email" : "john.doe@gmail.com"
      };
      console.log(this.tokenRequest)
      this.rechargementService.DoPostRequest("rechargementAction.json",data,this.tokenRequest).subscribe((response:any)=>{
        if(response.response.code == 200 &&response.response.status =="OK"){
          this.TokenPayement = response.response.payment_token;
          if(this.TokenPayement!==""){
            this.mySubscription = interval(3500).subscribe((x =>{
              this.CheckStatePaiementWave(this.TokenPayement);
          }));
          }
          window.open(response.response.payment_url, "_blank");
        }
      }); 
    }else{
      if(this.FormOperator.controls['contact_operation'].status == "INVALID" ||this.FormOperator.controls['amount'].status!=="INVALID" ){
        this.error_tel = true;
      }
    }
  }
  CheckStatePaiementWave(data:any){
   var body ={
    "payment_token":data
   } ;

   this.rechargementService.DoPostRequest("getStatutAction.json",body,this.tokenRequest).subscribe((response:any)=>{
      if(response.response.transaction_id){
        console.log(response.response.status)
        if(response.response.status=="EXPIRED"){
          this.mySubscription.unsubscribe();
          this.isLoading = false;
          this.route.navigate(['/error-transaction'])
        }else if(response.response.status=="SUCCESS"){
          this.mySubscription.unsubscribe();
          this.isLoading = false;
          this.route.navigate(['/succes-transaction'])
        }
      }
    })
  }



  isLoading = false;
  mySubscription: any;
}
