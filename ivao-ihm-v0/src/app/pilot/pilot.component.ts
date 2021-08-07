import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PilotService} from "../services/pilote.service";

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.scss']
})
export class PilotComponent implements OnInit {
  userId:string ='';
  constructor(private pilotService:PilotService,private router:Router) { }

  onViewPilot(){
    console.log('Go to pilot info : '+this.userId);
    this.pilotService.setCurrentUserId(this.userId);
    this.pilotService.getPilotInfoByUserId(this.pilotService.getCurrentUserId());
    this.pilotService.emitPilotSubject();
    this.router.navigate(['pilot-view']);
  }
  ngOnInit(): void {
  }
}
