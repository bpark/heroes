import {Component, OnInit} from '@angular/core';
import {MissionsRepositoryService} from "../model/missions/missions-repository.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Mission, MissionState} from "../model/missions/missions.model";
import {HeroAssignmentStateService} from "../model/state/hero-assignment-state.service";
import {MissionNameGeneratorService} from "../model/missions/mission-name-generator.service";

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  mission: Mission = null;
  editable: boolean = false;
  slots: number[] = [];

  constructor(private missionsRepository: MissionsRepositoryService,
              private activeRoute: ActivatedRoute,
              private heroAssignmentState: HeroAssignmentStateService,
              private router: Router,
              private missionNameGenerator: MissionNameGeneratorService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const id = params["id"];
      if (id) {

        this.resetStateIfOtherMission(id);

        console.log(id);
        this.missionsRepository.get(id).subscribe(result => {
          this.mission = result;
          this.editable = this.mission.state === MissionState.Available;
          this.mission.name = this.missionNameGenerator.generate(this.mission.id);
          this.heroAssignmentState.missionId = id;
          this.heroAssignmentState.slots = this.mission.slots;

          this.assignHeroesToMission();
          this.assignHeroesToSlots();

        });
      }
    });
  }

  start(): void {
    this.missionsRepository.startMission(this.mission.id, this.heroAssignmentState.heroIds).subscribe(
      success => {
        const extras = {queryParams: {'state': MissionState.Available}};
        this.router.navigate(['/missions'], extras).then()
      }
    );
  }

  private resetStateIfOtherMission(missionId: number): void {
    if (missionId !== this.heroAssignmentState.missionId) {
      this.heroAssignmentState.reset();
    }
  }

  private assignHeroesToMission(): void {
    if (this.heroAssignmentState.heroIds.length > 0) {
      this.mission.heroes = this.heroAssignmentState.heroIds;
    }
  }

  private assignHeroesToSlots(): void {
    this.slots = [];
    this.slots.push.apply(this.slots, this.mission.heroes);
    while (this.slots.length < this.mission.slots) {
      this.slots.push(null);
    }
  }
}
