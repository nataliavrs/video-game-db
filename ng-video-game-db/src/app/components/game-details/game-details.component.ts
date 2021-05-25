import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-details',
  template: `
  <ng-container *ngIf="game">
    <h1>{{game.name}}</h1>
    <img src="{{game.background_image}}" alt="">
  </ng-container>
  `,
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  game: any;
  constructor(private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const search = this.activatedRoute.snapshot.params.id;
    // console.log(sort, search);
    this.httpService
      .getGame(search)
      .subscribe((gameDetails: APIResponse<Game>) => {
        this.game = gameDetails;
    })
  }
}
