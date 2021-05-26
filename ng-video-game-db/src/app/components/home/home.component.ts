import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  template: `
    <!-- <div class="filters">
      <mat-form-field>
        <mat-label>Sort</mat-label>
        <mat-select
          panelClass="sort-select"
          [(ngModel)]="sort"
          (selectionChange)="searchGames(sort, 'puzzle')"
        >
          <mat-option value="-name">
          Name
          </mat-option>
          <mat-option value="-released">
          Released
          </mat-option>
          <mat-option value="-added">
          Added
          </mat-option>
          <mat-option value="-created">
          Created
          </mat-option>
          <mat-option value="-updated">
          Updated
          </mat-option>
          <mat-option value="-rating">
          Rating
          </mat-option>
          <mat-option value="-metacritic">
          Metacritic
          </mat-option>                                                                  
        </mat-select>
      </mat-form-field>
    </div> -->

    <div class="main-container">
      <div 
        class="game"
        (click)="openGameDetails(game.id)"
        *ngFor="let game of games"
        >
        <!-- Favorite -->
        <div class="favorite-heart">
          <a (click)="addFavorite(game.id, $event)">
            <mat-icon>favorite</mat-icon>
            <mat-icon>favorite_border</mat-icon>
          </a>
       </div>
       <!-- Image -->
       <div class="img-container">
        <div class="game-thumb-container">
          <img 
          src="{{game.background_image}}"
          class="game-thumbnail">
        </div>
      </div>
        <!-- Description -->
        <div class="game-description">
          <p class="game-name">{{game.name}}</p>
          <!-- <p class="game-name" *ngFor="let genre of game.genres">
            {{genre.name}}
          </p> -->
        </div>
        <!-- Platforms -->
        <div class="game-platforms">
          <img
            *ngFor="let platform of game.parent_platforms"
            src="assets/images/platforms/{{platform.platform.slug}}-brands.svg"
            title="{{platform.platform.slug}}"
            class="game-platform"
          >
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort: string;
  public games: Array<Game>;
  public favorites: any = [];
  error = 'false';

  constructor(private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['searchQuery']) {
        this.searchGames('metacrit', '', params['searchQuery']);
      } else {
          this.searchGames('metacrit', '');
        }
      })
  }
  
  searchGames(sort: string, genre: string, search?: string): void {
    genre = this.activatedRoute.snapshot.params.genre;
    search = this.activatedRoute.snapshot.params.searchQuery;
    this.httpService
      .getGameList(sort, genre, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(this.games);
    })
  }

  openGameDetails(id: string): void {
    this.httpService
      .getGame(id)
      .subscribe((gameDetails: APIResponse<Game>) => {
        console.log(gameDetails);
        this.router.navigate(['details', id])
      })   
  }

  // Add to favorites
  addFavorite(id: any, event) {
    event.stopPropagation();
    if (!this.favorites.includes(id)) {
      this.favorites.push(id);
    }

    localStorage.setItem("favorite", JSON.stringify(this.favorites));
  }
}
