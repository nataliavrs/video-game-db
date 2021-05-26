import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search-container">
      <form #form="ngForm" (ngSubmit)="onSubmit(form)">
          <span class="logo" routerLink="/">Games</span>
          <input 
              class="search-input"
              type="text"
              name="search"
              ngModel
              placeholder="Search 500,000+ games"
          >
          <button type="submit" class="search-button">Search</button>
      </form>
    </div>
  `,
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {}

  private registrationToken: string;
  
  // TO-DO: search only within the selected genre
  onSubmit(form: NgForm) {
    if (form.value.search) {
      this.router.navigate(['search', 'needtofix', form.value.search])
      form.reset();
    }
  }

}
