import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, FormArray} from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Reactive Form Demo';

  registrationForm:FormGroup;

  get userName(){
    return this.registrationForm.get('userName');
  }
  get email(){
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  constructor(private fb:FormBuilder){}

  

  ngOnInit(){
    this.registrationForm=this.fb.group({
      userName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      password:[''],
      confirmPassword:[''],
      email:[''],
      subscribe:[false],
      address:this.fb.group({
        city:[''],
        state:[''],
        postalCode:['']
      }),
      alternateEmails:this.fb.array([])
 },{validator:PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue=>{
      const email=this.registrationForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    // this._registrationService.register(this.registrationForm.value)
    //   .subscribe(
    //     response => console.log('Success!', response),
    //     error => console.error('Error!', error)
    //   );
  }


  // registrationForm=new FormGroup({
  //   userName:new FormControl('Satya'),
  //   password:new FormControl(''),
  //   confirmPassword:new FormControl(''),
  //   address:new FormGroup({
  //     city:new FormControl(''),
  //     state:new FormControl(''),
  //     postalCode:new FormControl('')
  //   })
  // });
   
  
  // loadApiData(){
  //   this.registrationForm.patchValue({
  //     userName:'satya prakash',
  //     password:'test',
  //     confirmPassword:'test',
  //     // address:{
  //     //   city:'City',
  //     //   state:'State',
  //     //   postalCode:'110001'
  //     // }
  //   })
  // }

}
