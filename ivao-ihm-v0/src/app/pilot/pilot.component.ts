import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PilotService} from "../services/pilote.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.scss']
})
export class PilotComponent implements OnInit {
  userId:string ='';
  errorMessage:string = '';
  errorMessageSubject: Subscription = new Subscription;
  constructor(private pilotService:PilotService,private router:Router) { }

  onViewPilot(){
    console.log('Go to pilot info : '+this.userId);
    if (this.userId !='') {
      this.pilotService.setCurrentUserId(this.userId);
      this.pilotService.getPilotInfoByUserId(this.pilotService.getCurrentUserId());
      this.pilotService.emitPilotSubject();
      this.router.navigate(['pilot-view']);
    }
    else {
      this.pilotService.setErrorMessage('User id field can not be empty');
      this.pilotService.emiterrorMessageSubjectSubject();
    }
  }
  ngOnInit(): void {
    this.errorMessageSubject = this.pilotService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );
  }
}
