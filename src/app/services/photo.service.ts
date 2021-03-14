import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(
    private http: HttpClient
  ) { }
  randomPhotos(page: number = 1) {
    return this.http.get(`https://pixabay.com/api/?key=${environment.pexelsApiKey}&image_type=photo&pretty=true&page=${page}`)
  }
  searchPhotos(query: string, page: number = 1) {
    return this.http.get(`https://pixabay.com/api/?key=${environment.pexelsApiKey}&image_type=photo&pretty=true&q=${encodeURIComponent(query)}&page=${page}`)
  }
}