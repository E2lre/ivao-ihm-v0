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
import { PilotComponent } from './pilot/pilot.component';
import { PilotViewComponent } from './pilot-view/pilot-view.component';
import { AtcComponent } from './atc/atc.component';
import { AtcViewComponent } from './atc-view/atc-view.component';
import {PilotService} from "./services/pilote.service";
import {AtcService} from "./services/atc.service";


const appRoutes: Routes = [
  {path:'weather-view',component:WeatherViewComponent},
  {path:'weather',component:WeatherComponent},
  {path:'pilot-view',component:PilotViewComponent},
  {path:'pilot',component:PilotComponent},
  {path:'atc-view',component:AtcViewComponent},
  {path:'atc',component:AtcComponent},
  {path:'ivao_error',component:IvaoErrorComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherViewComponent,
    IvaoErrorComponent,
    PilotComponent,
    PilotViewComponent,
    AtcComponent,
    AtcViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,//add pour form
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    WeatherService,
    PilotService,
    AtcService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
