import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {Router} from "@angular/router";
import {PilotService} from "../services/pilote.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-pilot-view',
  templateUrl: './pilot-view.component.html',
  styleUrls: ['./pilot-view.component.scss']
})
export class PilotViewComponent implements OnInit {
  fob:string ='';
  zfw:string ='';
  tow:string ='';
  paxNumber:string ='';
  pilot: any;
  errorMessage:string = '';
  printRequest:string='';
  printResponse:string='';
  errorMessageSubject: Subscription = new Subscription;
  pilotSubscription: Subscription = new Subscription;

  constructor(private pilotService:PilotService,private weatherService:WeatherService,private router:Router) { }

  ngOnInit(): void {
    this.pilotSubscription = this.pilotService.pilotSubject.subscribe(
      (pilot: any) =>{
        this.pilot = pilot;
      }
    );
    this.errorMessageSubject = this.pilotService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );

    this.pilot = this.pilotService.getPilot();
    console.log("this.pilot.userId"+this.pilot.userId+' this.pilot.callsign'+this.pilot.callsign );
    this.pilot.userId = this.pilotService.getCurrentUserId();

    this.pilotService.emitPilotSubject();
    console.log("this.pilot.userId"+this.pilot.userId+' this.pilot.callsign'+this.pilot.callsign );
    this.pilotService.emiterrorMessageSubjectSubject();
  }
  onPrint(){
    console.log('Print document and send message after printing');
    this.pilotService.setErrorMessage('Weather info is send to printer');
    this.pilotService.emiterrorMessageSubjectSubject();
    this.pilot.fob = this.fob;
    this.pilot.zfw = this.zfw;
    this.pilot.tow = this.tow;
    this.pilot.paxNumber = this.paxNumber;

    this.printRequest = 'User id: ' + this.pilot.userId + '\n'
                        +'Airport: ' + this.pilot.airport + '\n'
                        +'Departure Aerodrome: ' + this.pilot.departureAerodrome + '\n'
                        +'Cruising Level: ' + this.pilot.cruisingLevel + '\n'
                        +'Destination Aerodrome: ' + this.pilot.destinationAerodrome + '\n'
                        +'Departure Time: ' + this.pilot.departureTime + '\n'
                        +'Route: ' + this.pilot.route + '\n'
                        +'Person On Board: ' + this.pilot.personOnBoard + '\n'
                        +'On Ground: ' + this.pilot.onGround + '\n'
                        +'FOB: ' + this.pilot.fob + '\n'
                        +'ZFW: ' + this.pilot.zfw + '\n'
                        +'TOW: ' + this.pilot.tow + '\n'
                        +'Pax Number: ' + this.pilot.paxNumber + '\n';

    //console.log('printRequest ' +this.printRequest);

    this.printResponse = this.weatherService.printString(this.printRequest);
    if (this.printRequest==this. printResponse) {
      this.pilotService.setErrorMessage('Weather info is printed');
      this.pilotService.emiterrorMessageSubjectSubject();
    }
  }
  onNewSearch(){
    this.router.navigate(['pilot']);
  }
}
