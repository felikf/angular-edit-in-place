import { Component, OnInit } from '@angular/core';
import { USERS } from './users';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users = USERS;

  controls: FormArray;

  ngOnInit(): void {
    const formGroups = this.users.map(user => new FormGroup({
        id: new FormControl(user.id, Validators.required),
        name: new FormControl(user.name, Validators.required),
        username: new FormControl(user.username, Validators.required),
        email: new FormControl(user.email, Validators.required)
      })
    );

    this.controls = new FormArray(formGroups);
  }

  getControl(index: number, name: string): FormControl {
    return this.controls.at(index).get(name) as FormControl;
  }

  updated(index: number, field: string) {
    console.log(`updated ${index}, ${field}, ${this.getControl(index, field).value}`);
  }
}
