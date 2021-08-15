import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

export interface AtcInterface {
  userid: string;
  callsign: string;
  frequencey: string;
  atis: string;
}
@Injectable()
export class AtcService {
  atcSubject = new Subject<any>();
  errorMessageSubject = new Subject<any>();

  temp: any;
  private whazuupAtc = {
    time: '  ',
    id: '  ',
    userId: '  ',
    callsign: '  ',
    serverId: '  ',
    softwareTypeId: '  ',
    softwareVersion: '  ',
    rating: '  ',
    createdAt: '  ',
    atcSession: '  ',
    atis: '  ',
    lastTrack: '  '
  }
  private atcSessionS = {
    frequency: '  ',
    position: '  '
  }

  private atisS = {
    lines: '  ',
    revision: '  ',
    timestamp: '  '
  }
  private LastTrackAtc = {
    distance: '  ',
    latitude: '  ',
    longitude: '  ',
    time: '  ',
    timestamp: '  '
  }
  private atc = {
    userid: '  ',
    callsign: '  ',
    frequency: '  ',
    atis: '  '
  }

  private errorMessage: string;
  private printingResponse: string;

  private currentuserid: string;
  private currentcallsign: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.errorMessage = '';
    this.printingResponse = '';
    this.currentuserid = '';
    this.currentcallsign = '';
  }
  emitAtcSubject(){
    this.atcSubject.next(this.atc)
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
  getCurrentCallsign(){
    return this.currentcallsign;
  }
  setCurrentCallsign(currentcallsign: string) {
    this.currentcallsign = currentcallsign;
  }
  getAtc(){
    return this.atc;
  }
  getAtcInfoByUserId(userId:string) {
    console.log('getAtcInfoByUserId- start id='+userId);

    this.errorMessage = 'Access Data in progress, wait please' ;
    this.emiterrorMessageSubjectSubject();

    this.httpClient
      .get<any>('http://localhost:8082/ATCInfoVID/'+ userId)
      //.get<any>('http://localhost:8082/pilotInfoVID/'+ userId,{responseType: 'text' as 'json'})
      .subscribe((reponse) =>{
          console.log('getAtcInfoByUserId - recup info');
          //this.pilot = reponse;
          this.whazuupAtc =reponse;
          console.log('getAtcInfoByUserId - reponse:'+reponse);
          console.log('getAtcInfoByUserId - recup ok');
          console.log('getAtcInfoByUserId - whazzup time'+this.whazuupAtc.time);
          console.log('getAtcInfoByUserId - whazzup callsign'+this.whazuupAtc.callsign);
          this.getAtcInfoFromWhazuupPilot();
          this.emitAtcSubject();
          console.log('getAtcInfoByUserId - recup exit');
          this.errorMessage = '' ;
          this.emiterrorMessageSubjectSubject();
        },
        (error) => {
          console.log('getAtcInfoByUserId Erreur ! : ' + error);
          this.errorMessage = ' Technical error on getPilotInfoByUserId : '+ error.status + error.message ;
          this.emiterrorMessageSubjectSubject();
          this.router.navigate(['ivao-error']);
        }
      );
    console.log('getAtcInfoByUserId'+this.atc.callsign );
    return this.atc;
  }
  getAtcInfoByCallsign(callsign:string) {
    console.log('getAtcInfoByCallsign- start id='+callsign);

    this.errorMessage = 'Access Data in progress, wait please' ;
    this.emiterrorMessageSubjectSubject();

    this.httpClient
      .get<any>('http://localhost:8082/ATCInfoCallsign/'+ callsign)
      //.get<any>('http://localhost:8082/pilotInfoVID/'+ userId,{responseType: 'text' as 'json'})
      .subscribe((reponse) =>{
          console.log('getAtcInfoByCallsign - recup info');
          //this.pilot = reponse;
          this.whazuupAtc =reponse;
          console.log('getAtcInfoByCallsign - reponse:'+reponse);
          console.log('getAtcInfoByCallsign - recup ok');
          console.log('getAtcInfoByCallsign - whazzup time'+this.whazuupAtc.time);
          console.log('getAtcInfoByCallsign - whazzup callsign'+this.whazuupAtc.callsign);
          this.getAtcInfoFromWhazuupPilot();
          this.emitAtcSubject();
          console.log('getAtcInfoByCallsign - recup exit');
          this.errorMessage = '' ;
          this.emiterrorMessageSubjectSubject();
        },
        (error) => {
          console.log('getAtcInfoByCallsign Erreur ! : ' + error);
          this.errorMessage = ' Technical error on getPilotInfoByUserId : '+ error.status + error.message ;
          this.emiterrorMessageSubjectSubject();
          this.router.navigate(['ivao-error']);
        }
      );
    console.log('getAtcInfoByCallsign'+this.atc.callsign );
    return this.atc;
  }

  getAtcInfoFromWhazuupPilot() {

    this.atc.userid=this.whazuupAtc.userId;
    this.atc.callsign=this.whazuupAtc.callsign;
    //this.atc.atis=this.whazuupAtc.atis;
    this.temp = this.whazuupAtc.atis;
    this.atisS = this.temp;
    this.atc.atis = this.atisS.lines + ' / ' + this.atisS.revision + ' / ' + this.atisS.timestamp

    this.temp = this.whazuupAtc.atcSession;
    this.atcSessionS = this.temp;

    this.atc.frequency=this.atcSessionS.frequency;

  }





}
