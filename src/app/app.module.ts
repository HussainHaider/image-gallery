import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {IvyGalleryModule} from 'angular-gallery';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { HttpReqInterceptor } from './http-req-interceptor';
import { PhotoService } from './services/photo.service';
import { HeaderComponent } from './components/header/header.component';
import { MergePipe } from './pipe/merge.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MergePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    IvyGalleryModule,
    InfiniteScrollModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqInterceptor,
      multi: true
    },
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
