import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesListService {
  
  favoritesArray: any = [];

  constructor() { 
    // console.log(this.favoritesArray);
  }
}
