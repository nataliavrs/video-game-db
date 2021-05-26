import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-favorites-list',
  template: `
    <div class="games" >
      <ng-container  *ngFor="let game of favoritesList">
        <div 
          class="game"
        >
          <!-- (click)="openGameDetails(game.id)" -->
          <div class="game-thumb-container">
            <img 
            src="{{game.background_image}}"
            class="game-thumbnail">
          </div>
          </div>
        <div class="game-description">
          <p class="game-name">{{game.name}}</p>
          <p class="game-name" *ngFor="let genre of game.genres">
            {{genre.name}}
          </p>
          <div class="game-platforms">
          <img
            *ngFor="let platform of game.parent_platforms"
            src="assets/images/platforms/{{platform.platform.slug}}-brands.svg"
            title="{{platform.platform.slug}}"
            class="game-platform"
          >
          </div>
        </div>
    </ng-container>
  </div>
  `,
  styleUrls: ['../home/home.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favorites = [];
  favoritesList = [];
  

  constructor(private httpService: HttpService, private router: Router) {
    // console.log(localStorage.favorite);
  }

  ngOnInit(): void {
    var storedArray = localStorage.getItem("favorite");
    this.favorites = JSON.parse(storedArray);

    for (let index = 0; index < this.favorites.length; index++) {
      this.openGameDetails(this.favorites[index])
    }

    // console.log(this.favorites);
    
  }

  openGameDetails(id: any): void {
    this.httpService
      .getGame(id)
      .subscribe((gameDetails: APIResponse<Game>) => {
        // console.log(gameDetails);
        this.favoritesList.push(gameDetails)
        
        // console.log(this.favorites);
        
      })   
  }
}
