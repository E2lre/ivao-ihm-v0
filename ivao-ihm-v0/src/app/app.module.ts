import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './services/weather.service';
import { WeatherViewComponent } from './weather-view/weather-view.component';
import { IvaoErrorComponent } from './ivao-error/ivao-error.component';


const appRoutes: Routes = [
  {path:'weather-view',component:WeatherViewComponent},
  {path:'weather',component:WeatherComponent},
  {path:'ivao_error',component:IvaoErrorComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherViewComponent,
    IvaoErrorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,//add pour form
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
