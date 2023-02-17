import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-form',
  template: `
    <p>
      form works! {{name}}
    </p>
    <div *ngFor="let user of usernames">
        <span>{{user.username}}</span>
    </div>
    <input type="text" [(ngModel)]="name" (ngModelChange)="name = $event" />
    <button type="button" (click)="save()">Save</button>
  `,
  styles: [
    
  ]
})
export class FormComponent implements OnInit {

  name: string = "Testing";
  baseURL: string = "https://jsonplaceholder.typicode.com/users";
  usernames: Array<[]> = [];
  
  constructor(public http: HttpClient) { 
    
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.http.get<any[]>(this.baseURL)
        .subscribe(data => {
            this.usernames = data;
        },
        error => {
          console.log(error)
        }
  );
}

public save() {
  if (this.name) {  
    this.http.get<any[]>(this.baseURL)
     .pipe(
        map(items => items.filter(item => item.username === this.name))
      ).subscribe(data => {
          this.usernames = data;
        },
        error => {
          console.log(error)
        });
  }
}

}
