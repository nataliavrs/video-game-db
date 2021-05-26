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
        <div 
          class="game-thumb-container"
          (click)="openGameDetails(game.id)"
        >
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
