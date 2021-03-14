import { Component } from '@angular/core';
import {Gallery} from 'angular-gallery';
import { NgForm } from '@angular/forms';
import { PhotoService } from './services/photo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  query: any = <any>{};
  photoUrls: string[] = [];
  photoTags: string[] = [];
  page: number = 1;
  isLoading: boolean = true;

  ngOnInit() {
    this.getPhotos();
  }

  constructor(private gallery: Gallery, private photoService: PhotoService) {}
  showGallery(index: number) {

    let imageData = this.photoUrls.map((item) => {
      return {path: item};
    });

    let prop = {
        images: imageData,
        index
    };
    this.gallery.load(prop);
  }

  closeGallery() {
    this.gallery.close();
  }

  getPhotos() {
    this.photoService.randomPhotos(this.page)
      .subscribe(res => {
        this.photoUrls = this.photoUrls.concat((res as any).hits.map((p: { largeImageURL: string }) => p.largeImageURL));
        this.photoTags = this.photoTags.concat((res as any).hits.map((p: { tags: string }) => p.tags));
        this.isLoading = false;
      })
  }
  searchPhotos(searchForm: NgForm) {
    if (searchForm.invalid) {
      return;
    }
    this.page = 1;
    this.photoUrls = [];
    this.requestSearchPhotos();
  }
  requestSearchPhotos() {
    this.isLoading = true;
    this.photoService.searchPhotos(this.query.search, this.page)
      .subscribe(res => {
        this.isLoading = false;
        this.photoUrls = this.photoUrls.concat((res as any).hits.map((p: {largeImageURL: any; }) => p.largeImageURL));
      })
  }
  onScroll() {
    this.page++
    if (!this.query.search) {
      this.getPhotos();
    }
    else {
      this.requestSearchPhotos();
    }
  }
}
