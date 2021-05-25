import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    genre: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering).set('genres', genre);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, 
    {
      params: params,
    }
    );
  }

  getGame(
    // ordering: string,
    id: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('id', id);

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games/${id}`, 
    {
      params: params,
    }
    );
  }

  getGenres(genre?: string) {
    let params = new HttpParams().set('genre', genre);
    
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/genres`, 
    {
      params: params,
    }
    );
  }

  getTrailer(id) {
    let params = new HttpParams().set('id', id);
    
    return this.http.get<any>(`${env.BASE_URL}/games/${id}/movies`, 
    {
      params: params,
    }
    );
  }

  getScreenshots(id) {
    let params = new HttpParams().set('id', id);
    
    return this.http.get<any>(`${env.BASE_URL}/games/${id}/screenshots`, 
    {
      params: params,
    }
    );
  }
}
