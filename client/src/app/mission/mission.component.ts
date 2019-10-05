import {Component, OnInit} from '@angular/core';
import {MissionsRepositoryService} from "../model/missions/missions-repository.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Mission} from "../model/missions/missions.model";
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
              private router: Router) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const id = params["id"];
      if (id) {

        this.resetStateIfOtherMission(id);

        console.log(id);
        this.missionsRepository.get(id).subscribe(result => {
          this.mission = result;
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
      success => this.router.navigate(['/missions'], {queryParams: {'running': false}}).then()
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
