import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {PilotService} from "../services/pilote.service";
import {WeatherService} from "../services/weather.service";
import {Router} from "@angular/router";
import {AtcService} from "../services/atc.service";

@Component({
  selector: 'app-atc-view',
  templateUrl: './atc-view.component.html',
  styleUrls: ['./atc-view.component.scss']
})
export class AtcViewComponent implements OnInit {
  atc: any;
  errorMessage:string = '';
  printRequest:string='';
  printResponse:string='';
  errorMessageSubject: Subscription = new Subscription;
  atcSubscription: Subscription = new Subscription;

  constructor(private atcService:AtcService,private weatherService:WeatherService,private router:Router) { }

  ngOnInit(): void {
    this.atcSubscription = this.atcService.atcSubject.subscribe(
      (atc: any) =>{
        this.atc = atc;
      }
    );
    this.errorMessageSubject = this.atcService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );

    this.atc = this.atcService.getAtc();
    console.log('this.pilot.callsign'+this.atc.callsign );
    this.atc.userId = this.atcService.getCurrentUserId();

    this.atcService.emitAtcSubject();
    console.log('this.pilot.callsign'+this.atc.callsign );
    this.atcService.emiterrorMessageSubjectSubject();
  }
  onPrint(){
    console.log('Print document and send message after printing');
    this.atcService.setErrorMessage('Weather info is send to printer');
    this.atcService.emiterrorMessageSubjectSubject();

    this.printRequest = 'User id: ' + this.atc.userid + ' Callsign: '+ this.atc.callsign + '\n'
      +'Airport: ' + this.atc.airport + '\n'
      +'Frequency: ' + this.atc.frequency + '\n'
      +'ATIS: ' + this.atc.atis ;

    this.printResponse = this.weatherService.printString(this.printRequest);
    this.weatherService.emitWeatherSubject();
    if (this.printRequest==this. printResponse) {
      this.atcService.setErrorMessage('Weather info is printed');
      this.atcService.emiterrorMessageSubjectSubject();
    }
    this.atcService.setErrorMessage(this.weatherService.getErrorMessage());
    this.atcService.emiterrorMessageSubjectSubject();
  }
  onNewSearch(){
    this.router.navigate(['atc']);
  }

}
