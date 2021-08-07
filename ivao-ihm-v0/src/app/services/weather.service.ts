import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpClientModule} from '@angular/common/http';
import {Router} from "@angular/router";


export interface WheatherInterface {
  airport: string,
  metar: string,
  tar: string
}

@Injectable()
export class WeatherService {

  weatherSubject = new Subject<any>();
  errorMessageSubject = new Subject<any>();

  private weather = {
    airport: '  ',
    metar: ' ',
    tar: ' '
  };
  private currentAirport:string;
  private metar:string;
  private tar:string;
  private errorMessage:string;
  private printingResponse:string

  constructor(private httpClient: HttpClient, private router:Router) {
    this.errorMessage='';
    this.printingResponse='';
    this.currentAirport='';
    this.metar='';
    this.tar='';
  }
  emitWeatherSubject(){
    //console.log('emitPatientSubject - start');
    this.weatherSubject.next(this.weather)
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
  getCurrentAirport(){
    return this.currentAirport;
  }
  setCurrentAirport(airport: string) {
    this.currentAirport = airport;
  }
  getWeather(){
    return this.weather;
  }

  getWeatherInfoByaAirport(airport:string) {
    console.log('getWeatherInfoByaAirport- start airport='+airport);
    this.weather.airport = airport;
    this.weather.metar = "";
    this.weather.tar ="";
    this.errorMessage = 'Access Data in progress, wait please' ;
    this.emiterrorMessageSubjectSubject();



        this.httpClient
          .get<any>('http://localhost:8082/airportWeatherObs/'+ airport,{responseType: 'text' as 'json'})
          .subscribe((reponse) =>{
              console.log('getWeatherInfoByaAirport OBS - recup info');
              this.metar = reponse;
              console.log('getWeatherInfoByaAirport OBS- recup ok');
              console.log('getWeatherInfoByaAirport OBS - value'+this.weather.airport + ' - ' + this.metar );
              this.weather.metar = this.metar;
              this.emitWeatherSubject();
              console.log('getWeatherInfoByaAirport OBS- recup exit');
            },
            (error) => {
              if (error.status === 404) {
                console.log('The airport '+ airport +' does not exist or check your web connection (404)');
                this.errorMessage = 'The airport '+ airport +' does not exist or check your web connection (404)';
                this.emiterrorMessageSubjectSubject();
              } else {
                console.log('getWeatherInfoByaAirport OBS Erreur ! : ' + error);
                //this.router.navigate(['fourofour']);
                this.errorMessage = ' Technical error on getWeatherInfoByaAirport OBS: ' + error.status + error.message;
                this.emiterrorMessageSubjectSubject();
                this.router.navigate(['ivao-error']);
              }
            }
          );
        this.httpClient
          .get<any>('http://localhost:8082/airportWeatherPrev/'+ airport,{responseType: 'text' as 'json'})
          .subscribe((reponse) =>{
              console.log('getWeatherInfoByaAirport PREV- recup info');
              this.tar = reponse;
              console.log('getWeatherInfoByaAirport PREV- recup ok');
              console.log('getWeatherInfoByaAirport PREV- value'+this.weather.airport + ' - ' + this.tar );
              this.weather.tar = this.tar;
              this.emitWeatherSubject();
              this.errorMessage = '' ;
              this.emiterrorMessageSubjectSubject();

              console.log('getWeatherInfoByaAirport PREV- recup exit');
            },
            (error) => {
              if (error.status === 404) {
                console.log('The airport '+ airport +' does not exist or check your web connection (404)');
                this.errorMessage = 'The airport '+ airport +' does not exist or check your web connection (404)';
                this.emiterrorMessageSubjectSubject();
              } else {
                console.log('getWeatherInfoByaAirport PREV Erreur ! : ' + error);
                //this.router.navigate(['fourofour']);
                this.errorMessage = ' Technical error on getWeatherInfoByaAirport PREV : ' + error.status + error.message;
                this.emiterrorMessageSubjectSubject();
                this.router.navigate(['ivao-error']);
              }
            }
          );
        console.log('getWeatherInfoByaAirport fin : ' + this.weather.airport + ' - ' + this.weather.metar+ ' - ' + this.weather.tar);
        this.emitWeatherSubject();
    return this.weather;
  }

  printString(info:string) {
    console.log('printString- start info='+info);
    this.printingResponse='';
    this.errorMessage = 'Weather info is send to printer, please wait' ;
    this.emiterrorMessageSubjectSubject();

    this.httpClient
      //.get<any>('http://localhost:8082/printString/'+ info,{responseType: 'text' as 'json'})
      .post('http://localhost:8082/printString/',info,{responseType: 'text' as 'json'})
      .subscribe((reponse) =>{
          console.log('printString - recup info');
          //this.printingResponse = reponse;
          this.emitWeatherSubject();
          this.errorMessage = 'Weather info is printed';
          this.emiterrorMessageSubjectSubject();
          console.log('printString - recup exit');
        },
        (error) => {
          if (error.status === 404) {
            console.log('Error during printing(404)');
            this.errorMessage = 'Error during printing(404)';
            this.emiterrorMessageSubjectSubject();
          } else {
            console.log('Technical error during printing : ' + error);
            //this.router.navigate(['fourofour']);
            this.errorMessage = ' Technical error during printing: ' + error.status + error.message;
            this.emiterrorMessageSubjectSubject();
            this.router.navigate(['ivao-error']);
          }
        }
      );

    this.emitWeatherSubject();
    return this.printingResponse;
  }
}
