import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="filters">
      <mat-form-field>
        <mat-label>Sort</mat-label>
        <mat-select
          panelClass="sort-select"
          [(ngModel)]="sort"
          (selectionChange)="searchGames(sort)"
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
    </div>
    
    <div class="games">
      <ng-container *ngFor="let game of games">
        <div 
          class="game"
          (click)="openGameDetails(game.id)"
        >
          <div class="game-thumb-container">
            <img 
            src="{{game.background_image}}"
            class="game-thumbnail">
          </div>
        </div>
        <div class="game-description">
          <p class="game-name">{{game.name}}</p>
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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort: string;
  public games: Array<Game>

  constructor(private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['searchQuery']) {
        this.searchGames('metacrit', params['searchQuery']);
      } else {
        this.searchGames('metacrit');
      }
    })
  }
  
  searchGames(sort: string, search?: string): void {
    search = this.activatedRoute.snapshot.params.searchQuery;
    // console.log(sort, search);
    this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
    })
  }

  openGameDetails(id) {
    
    this.httpService
      .getGame(id)
      .subscribe((gameDetails: APIResponse<Game>) => {
        console.log(gameDetails);
        this.router.navigate(['details', id])
      })   
  }
}
