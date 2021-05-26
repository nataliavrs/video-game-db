import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-genres',
  template: `
  <h1 style="font-size: 7rem; margin: 30px; text-align: center">Genres</h1>
    <div class="main-container">
      <div
        class="genres-container"
        *ngFor="let genre of genres"
        [routerLink]="['home', genre.slug | lowercase]" 
      >

      <img height="150px" src="{{genre.image_background}}">

        <div class="genre-name">
          {{genre.name}}
        </div>

        <div class="genre-initial">
          {{genre.name | slice:0:1}}
        </div>

        <div class="genre-next">
          <mat-icon class="icon" aria-hidden="false" aria-label="Example home icon">chevron_right</mat-icon>
        </div>
  
      </div>

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
