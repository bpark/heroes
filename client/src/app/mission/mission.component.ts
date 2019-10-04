import {Component, OnInit} from '@angular/core';
import {MissionsRepositoryService} from "../model/missions/missions-repository.service";
import {ActivatedRoute} from "@angular/router";
import {Mission} from "../model/missions/missions.model";
import {Location} from '@angular/common';
import {HeroAssignmentStateService} from "../model/state/hero-assignment-state.service";

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  mission: Mission = null;
  slots: number[] = [];

  constructor(private missionsRepository: MissionsRepositoryService,
              private activeRoute: ActivatedRoute,
              private heroAssignmentState: HeroAssignmentStateService,
              private location: Location) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        console.log(id);
        this.missionsRepository.get(id).subscribe(result => {
          this.mission = result;
          this.heroAssignmentState.missionId = id;
          this.mission.heroes = this.heroAssignmentState.heroIds;
          this.slots.push.apply(this.slots, this.mission.heroes);
          console.log("current slots: " + this.slots.length);
          while (this.slots.length < 3) {
            console.log("pushing null");
            this.slots.push(null);
          }
        });
      }
    })
  }

}
