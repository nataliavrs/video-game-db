import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-details',
  template: `
  <pre>{{game| json}}</pre>
  
  <div class="main-container" *ngIf="game">
    
    <div class="img-container">
      <img src="{{game.background_image}}">
      <div class="info-box">
        <h1 class="game-name">{{game.name}}</h1>
        <h1>{{game.publishers[0].name | uppercase}}</h1>
        <h2>Released {{game.released | date:'longDate'}}</h2>
      </div>
    </div>
    
    <mat-tab-group mat-align-tabs="center">
      <mat-tab label="About">
        {{game.description_raw}}
        <br>
        <a href="{{game.website}}" target="_blank">
          <button class="website" mat-raised-button>Game site</button>
        </a>
        <a href="{{game.metacritic_url}}" target="_blank">
          <button class="website" mat-raised-button>Metacritic</button>
        </a>
        <a href="{{game.metacritic_url}}" target="_blank">
          <button class="website" mat-raised-button>Metacritic</button>
        </a>

    <!-- <h3>metacritic {{game.metacritic}}</h3>
    <h3>Rating {{game.rating}}</h3>
    <h3>Rating count{{game.count}}</h3>
    <ul>
      <li *ngFor="let rating of game.ratings" >
        <h5>{{rating.title}} | {{rating.count}}</h5>
      </li>
    </ul> -->
      <h2>Genres</h2>
      <span *ngFor="let genre of game.genres" >
        {{genre.name}}
      </span>
      <h2>Developer</h2>
      <span>
        {{game.developers[0].name}}
      </span>
      <br>
      <h2>Language</h2>
      <span>
      </span>
      <br>
      </mat-tab>
      <mat-tab label="Screenshoots">
        <div class="screen-container">
          <img class="screenshot" *ngFor="let picture of screenshot" src="{{picture.image}}">
        </div>
      </mat-tab>
      <mat-tab label="Trailers" *ngIf="trailer" (click)="showTrailer()">
        <video width="320" height="240" controls *ngIf="trailer">
          <source src="{{trailer}}" type="video/mp4">
          <source src="{{trailer}}"  type="video/ogg">
          Your browser does not support the video tag.
        </video>
      </mat-tab>
    </mat-tab-group> 
  </div>
  `,
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  game: any;
  trailer: any;
  screenshot: any = [];

  constructor(private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const search = this.activatedRoute.snapshot.params.id;
    this.httpService
      .getGame(search)
      .subscribe((gameDetails: APIResponse<Game>) => {
        // console.log(gameDetails);
        this.game = gameDetails;
    })

    this.showTrailer();
    this.showScreenshot();
  }

  showTrailer(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.httpService
      .getTrailer(id)
      .subscribe((res) => {
        if (res.count > 0) {
          this.trailer = res.results[0].data.max;
        }
    })
  }

  showScreenshot(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.httpService
      .getScreenshots(id)
      .subscribe((res) => {
        if (res.count > 0) {
          for (let index = 0; index < res.results.length; index++) {
            // console.log(res.results[index].image);
            this.screenshot.push({"image": res.results[index].image});
          }       
        }
    })
  }
}
