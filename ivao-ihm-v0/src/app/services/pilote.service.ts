import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpClientModule} from '@angular/common/http';
import {Router} from "@angular/router";

export interface PilotInterface {
   userid: string;
   airport: string;
   departureAerodrome: string;
   cruisingLevel: string;
   destinationAerodrome: string;
   departureTime: string;
   route: string;
   personOnBoard: string;
   atis: string;
   onGround: string;
   fob: string;
   zfw: string;
   tow: string;
   paxNumber: string;
}

@Injectable()
export class PilotService {
  pilotSubject = new Subject<any>();
  errorMessageSubject = new Subject<any>();

  temp:any;
  private whazuupPilot = {
    time: '  ',
    id: '  ',
    userId: '  ',
    callsign: '  ',
    serverId: '  ',
    softwareTypeId: '  ',
    softwareVersion: '  ',
    rating: '  ',
    createdAt: '  ',
    flightPlan: '  ',
    pilotSession: '  ',
    lastTrack: '  '
    };
  private flightPlanS = {
    id: '  ',
    sessionId: '  ',
    revision: '  ',
    aircraftId: '  ',
    aircraftNumber: '  ',
    departureId: '  ',
    arrivalId: '  ',
    alternativeId: '  ',
    alternative2Id: '  ',
    route: '  ',
    remarks: '  ',
    speed: '  ',
    level: '  ',
    flightRules: '  ',
    flightType: '  ',
    eet: '  ',
    endurance: '  ',
    departureTime: '  ',
    actualDepartureTime: '  ',
    peopleOnBoard: '  ',
    createdAt: '  ',
    updatedAt: '  ',
    aircraftEquipments: '  ',
    aircraftTransponderTypes: '  ',
    aircraft: '  '
  };
  private aircraftStruct = {
    icaoCode: '  ',
    model: '  ',
    wakeTurbulence: '  ',
    isMilitary: '  ',
    description: '  '
  };
  private pilotSession = {
    simulatorId: '  ',
    textureId: '  '
  }

  private lastTrack = {
    altitude: '  ',
    altitudeDifference: '  ',
    arrivalDistance: '  ',
    departureDistance: '  ',
    groundSpeed: '  ',
    heading: '  ',
    latitude: '  ',
    longitude: '  ',
    onGround: '  ',
    state: '  ',
    time: '  ',
    timestamp: '  ',
    transponder: '  ',
    transponderMode: '  '
  }

  private pilot = {
    userid: '  ',
    callsign: ' ',
    aircraft: ' ',
    departureAerodrome: ' ',
    cruisingLevel: ' ',
    destinationAerodrome: ' ',
    departureTime: ' ',
    route: ' ',
    personOnBoard: ' ',
    //atis: ' ',
    onGround: ' ',
    fob: ' ',
    zfw: ' ',
    tow: ' ',
    paxNumber: ' '
  };

  private currentuserid: string;
  private userid: string;
  private callsign:string
  private airport: string;
  private departureAerodrome: string;
  private cruisingLevel: string;
  private destinationAerodrome: string;
  private departureTime: string;
  private route: string;
  private personOnBoard: string;
  private atis: string;
  private onGround: string;
  private fob: string;
  private zfw: string;
  private tow: string;
  private paxNumber: string;

  private errorMessage: string;
  private printingResponse: string

  constructor(private httpClient: HttpClient, private router: Router) {
    this.errorMessage = '';
    this.printingResponse = '';
    this.currentuserid = '';
    this.userid = '';
    this.callsign = '';
    this.airport = '';
    this.departureAerodrome = '';
    this.cruisingLevel = '';
    this.destinationAerodrome = '';
    this.departureTime = '';
    this.route = '';
    this.personOnBoard = '';
    this.atis = '';
    this.onGround = '';
    this.fob = '';
    this.zfw = '';
    this.tow = '';
    this.paxNumber = '';
  }

  emitPilotSubject(){
    //console.log('emitPatientSubject - start');
    this.pilotSubject.next(this.pilot)
    //console.log('emitPatientSubject - end');
  }

  emiterrorMessageSubjectSubject(){
    this.errorMessageSubject.next(this.errorMessage);
  }
  getErrorMessage(){
    return this.errorMessage;
  }
  setErrorMessage (message: string){
    this.errorMessage = message;
  }
  getCurrentUserId(){
    return this.currentuserid;
  }
  setCurrentUserId(currentuserid: string) {
    this.currentuserid = currentuserid;
  }
  getPilot(){
    return this.pilot;
  }
  getPilotInfoByUserId(userId:string) {
    console.log('getPilotInfoByUserId- start id='+userId);

    this.errorMessage = 'Access Data in progress, wait please' ;
    this.emiterrorMessageSubjectSubject();

   /* var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tocken
    });*/

    this.httpClient
      .get<any>('http://localhost:8082/pilotInfoVID/'+ userId)
      //.get<any>('http://localhost:8082/pilotInfoVID/'+ userId,{responseType: 'text' as 'json'})
      .subscribe((reponse) =>{
          console.log('getPilotInfoByUserId - recup info');
          //this.pilot = reponse;
          this.whazuupPilot =reponse;
          console.log('getPilotInfoByUserId - reponse:'+reponse);
          console.log('getPilotInfoByUserId - recup ok');
          console.log('getPilotInfoByUserId - whazzup time'+this.whazuupPilot.time);
          console.log('getPilotInfoByUserId - whazzup callsign'+this.whazuupPilot.callsign);
          this.getPilotInfoFromWhazuupPilot();
          this.emitPilotSubject();
          console.log('getPilotInfoByUserId - recup exit');
          this.errorMessage = '' ;
          this.emiterrorMessageSubjectSubject();
        },
        (error) => {
          console.log('getPilotInfoByUserId Erreur ! : ' + error);
          //this.router.navigate(['fourofour']);
          this.errorMessage = ' Technical error on getPilotInfoByUserId : '+ error.status + error.message ;
          this.emiterrorMessageSubjectSubject();
          this.router.navigate(['ivao-error']);
        }
      );
    console.log('getPilotInfoByUserId'+this.pilot.callsign + ' - route:' + this.pilot.route);
    return this.pilot;
  }

  getPilotInfoFromWhazuupPilot() {

    this.pilot.userid=this.whazuupPilot.userId;
    this.pilot.callsign=this.whazuupPilot.callsign;

    this.temp = this.whazuupPilot.flightPlan;
    this.flightPlanS = this.temp;

    this.pilot.aircraft=this.flightPlanS.aircraftId;
    this.pilot.departureAerodrome=this.flightPlanS.departureId;
    this.pilot.cruisingLevel=this.flightPlanS.level;
    this.pilot.destinationAerodrome=this.flightPlanS.arrivalId;
    this.pilot.departureTime=this.flightPlanS.departureTime;
    this.pilot.route=this.flightPlanS.route;
    this.pilot.personOnBoard=this.flightPlanS.peopleOnBoard;

    this.temp = this.whazuupPilot.lastTrack;
    this.lastTrack = this.temp;

    this.pilot.onGround=this.lastTrack.onGround;

  }
}
