import {Component, OnInit} from '@angular/core';
import {MissionsRepositoryService} from "../model/missions/missions-repository.service";
import {Mission} from "../model/missions/missions.model";
import {ActivatedRoute} from "@angular/router";
import {MissionNameGeneratorService} from "../model/missions/mission-name-generator.service";

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  missions: Mission[] = null;
  running: boolean = false;

  constructor(private missionsRepository: MissionsRepositoryService,
              private activeRoute: ActivatedRoute,
              private missionNameGenerator: MissionNameGeneratorService) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.running = (params["running"] == "true");
      this.missionsRepository.list().subscribe(result => {
        result.forEach(r => {
          r.name = this.missionNameGenerator.generate(r.id)
        });
        this.missions = result.filter(m => m.running === this.running);
        console.log(result);
      });
    });
  }

}
