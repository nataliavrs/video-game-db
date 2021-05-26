import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites-list',
  template: `
      <ng-content></ng-content>
      {{error}}
  `,
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  @Input() error: string;

  constructor() {
    // console.log(this.error);
   }

  ngOnInit(): void {
  }

}
