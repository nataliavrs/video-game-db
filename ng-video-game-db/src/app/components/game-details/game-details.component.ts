import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-details',
  template: `

  <ng-container *ngIf="game" >
    <h1>{{game.name}}</h1>
    <img height="300px" src="{{game.background_image}}">
    
    <div>
      <h1>{{game.publishers[0].name}}</h1>
    </div>
    
    <h3>released {{game.released}}</h3>
    <h3>metacritic {{game.metacritic}}</h3>

    <a href="{{game.website}}"></a>
    
    <h3>Rating {{game.rating}}</h3>
    <h3>Rating count{{game.count}}</h3>

    <ul>
      <li *ngFor="let rating of game.ratings" >
        <h5>{{rating.title}} | {{rating.count}}</h5>
      </li>
    </ul>

    <ul>
      <li *ngFor="let genre of game.genres" >
        <h5>{{genre.name}}</h5>
      </li>
    </ul>


    <mat-tab-group mat-align-tabs="center">
      <mat-tab label="About">{{game.description_raw}}</mat-tab>
      <mat-tab label="Screenshoots" >
        <img height="300px" *ngFor="let picture of screenshot" src="{{picture.image}}">
        
      </mat-tab>
      <mat-tab label="Trailers" *ngIf="trailer" (click)="showTrailer()">
        
        <video width="320" height="240" controls *ngIf="trailer">
          <source src="{{trailer}}" type="video/mp4">
          <source src="{{trailer}}"  type="video/ogg">
          Your browser does not support the video tag.
        </video>
  
      </mat-tab>
    </mat-tab-group>

  </ng-container>
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
