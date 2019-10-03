import { Component, OnInit } from '@angular/core';
import {MissionsRepositoryService} from "../model/missions/missions-repository.service";
import {Mission} from "../model/missions/missions.model";

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  missions: Mission[] = null;

  constructor(private missionsRepository: MissionsRepositoryService) { }

  ngOnInit() {
    this.missionsRepository.list().subscribe(result => {
      this.missions = result;
      console.log(result)
    });
  }

}
