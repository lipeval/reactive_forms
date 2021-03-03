import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  originForm: FormGroup;
  isValid: false;
  formJson;
  forbbidenSenders = ['Chris', 'Ana'];

  countries = ['MEX', 'USA', 'FRANCE', 'GERMANY', 'COLOMBIA']

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.originForm = this.fb.group({
      userData: this.fb.group({
        sender: ['', Validators.required],
        nameSender: ['', [Validators.required, this.forbiddenNames.bind(this)]],
        lastNameSender: ['', Validators.required],
        emailSender: ['', [Validators.required, Validators.email]],
        phoneSender:['', [Validators.required, Validators.minLength(8)]],
      }),
      originData: this.fb.group({
        addressOrigin: ['', Validators.required],
        numberOrigin: ['', Validators.required],
        codePostalOrigin: ['', [Validators.required, Validators.min(5), Validators.max(5)]],
        country: ['']
      }),
      comments: this.fb.array([])
     


    });
    // this.originForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value)

    //   }
    // )
        // this.originForm.statusChanges.subscribe((status) => {
        //   console.log(status);
        // });

      this.originForm.patchValue({
        userData: {
          sender: 'Quien lo manda'
        }
       
      })
  }

  get fUser() { return this.originForm.get('userData')};
  get fOrigin() { return this.originForm.get('originData')};

  onSubmit(){

    console.log(this.originForm)
    this.formJson = this.originForm.value;

    this.originForm.reset({
      userData: {
        sender: ''
      }
    });
    // if(this.originForm.valid){
    //   
    //   this.formJson = this.originForm.value;
    // } else {
    //   alert('falta info broca')
    // }
  }

  // FORM ARRAY
  onAddComment(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.originForm.get('comments')).push(control)
  }


  // CUSTOM VALIDATOR
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbbidenSenders.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true}
    }
    return null;
  }

  // ASYNC VALIDATOR
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
        

      },1500)
      
    });
    return promise
  }
 

}
