import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-favorites-list',
  template: `
  <h1 class="page-title">Your Favorites</h1>
  <div class="main-container" *ngIf="favoritesList.length > 0">
   <div 
        class="game"
        (click)="openGameDetails(game.id)"
        *ngFor="let game of favoritesList"
        >
        <!-- Favorite -->
        <div class="favorite-heart">
          <a (click)="addFavorite(game.id, $event)">
            <mat-icon>favorite</mat-icon>
          </a>
       </div>
       <!-- Image -->
       <div class="img-container">
        <div class="game-thumb-container">
          <img 
            src="{{game.background_image}}"
            class="game-thumbnail"
          >
        </div>
      </div>
        <!-- Description -->
        <div class="game-description">

          <p class="game-name">{{game.name}}</p>
          
          <div class="game-platforms" *ngFor="let platform of game.parent_platforms | slice:0:4;">
            <span>{{platform.platform.name}}</span>
          </div>
          
          
        </div>
        
        <span 
          class="game-rating"
          [style.background-color]="game.rating * 2 >= 8 ? '#66CC33' : game.rating * 2 >= 4 ? '#FFCC33' : '#FF0000'"
        >
          <span> {{game.rating === 0 ? 'Unavailable ' : game.rating * 2 }}</span>
        </span>

    </div>
  `,
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favorites = [];
  favoritesList = [];

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    var storedArray = localStorage.getItem("favorite");
    this.favorites = JSON.parse(storedArray);

    for (let index = 0; index < this.favorites.length; index++) {
      this.GetItems(this.favorites[index])
    }
  }

  GetItems(id: string): void {
    this.httpService
      .getGame(id)
      .subscribe((gameDetails: APIResponse<Game>) => {
        this.favoritesList.push(gameDetails);
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
}
