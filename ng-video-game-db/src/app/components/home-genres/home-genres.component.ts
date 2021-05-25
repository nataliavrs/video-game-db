import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-genres',
  template: `
    <div
      style="background-color: red; margin: 5px;"
      *ngFor="let genre of genres"
      [routerLink]="['home', genre.slug | lowercase]" 
    >
      {{genre.name}}

      <img height="150px" src="{{genre.image_background}}" alt="">
    </div>
  `,
  styleUrls: ['./home-genres.component.scss']
})
export class HomeGenresComponent implements OnInit {
  public genres: any;

  constructor(private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.searchGames();
    })
  }
  
  searchGames(genre?: string): void {
    this.httpService
      .getGenres()
      .subscribe( (res) => {
        this.genres = res.results;
    })
  }
}
