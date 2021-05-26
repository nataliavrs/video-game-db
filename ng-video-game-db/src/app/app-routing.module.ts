import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { HomeGenresComponent } from './components/home-genres/home-genres.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeGenresComponent},
  { path: 'home/:genre', component: HomeComponent},
  { path: 'search/:genre/:searchQuery', component: HomeComponent},
  { path: 'details/:id', component: GameDetailsComponent},
  { path: 'favorites', component: FavoritesListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
