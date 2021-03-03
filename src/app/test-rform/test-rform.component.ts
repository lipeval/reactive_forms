import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'test-rform',
  templateUrl: './test-rform.component.html',
  styleUrls: ['./test-rform.component.css']
})
export class TestRformComponent implements OnInit {
  projectForm: FormGroup;
  formJson: any;
  forbiddenName = ['Test']

  projectStatus = ['Stable', 'Critical', 'Finished']

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required, this.asyncForbiddenName],
      email: ['', [Validators.required, Validators.email]],
      status: ['']

    })
  }

  get f() {return this.projectForm.controls}

  onSubmit(){
    console.log(this.projectForm.value)
    this.formJson = this.projectForm.value;

    console.log(this.formJson)
 
    
  }


  forbiddenProjectName(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenName.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true}
    }
    return null;
  }

  asyncForbiddenName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'Test'){
          resolve({'nameIsForbidden': true})
        }
        resolve(null)

      }, 1500)
    });
    return promise
  }

}
