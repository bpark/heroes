import {Component, OnInit} from '@angular/core';
import {MissionsRepositoryService} from "../model/missions/missions-repository.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Mission, MissionState} from "../model/missions/missions.model";
import {HeroAssignmentStateService} from "../model/state/hero-assignment-state.service";
import {MissionNameGeneratorService} from "../model/missions/mission-name-generator.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NetworkErrorComponent} from "../errors/network-error/network-error.component";

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  private static readonly idParam = "id";
  private static readonly missionsPath = "/missions";

  mission: Mission = null;
  MissionState = MissionState;
  editable: boolean = false;
  slots: number[] = [];
  loots = [false, false, false];

  constructor(private missionsRepository: MissionsRepositoryService,
              private activeRoute: ActivatedRoute,
              private heroAssignmentState: HeroAssignmentStateService,
              private router: Router,
              private missionNameGenerator: MissionNameGeneratorService,
              private ngbModal: NgbModal,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const id = params[MissionComponent.idParam];
      if (id) {

        this.resetStateIfOtherMission(id);

        this.logger.debug("fetching mission: ", id);
        this.missionsRepository.get(id).subscribe(result => {
          this.mission = result;
          this.editable = this.mission.state === MissionState.Available;
          this.mission.name = this.missionNameGenerator.generate(this.mission.id);
          this.heroAssignmentState.missionId = id;
          this.heroAssignmentState.slots = this.mission.slots;

          this.assignHeroesToMission();
          this.assignHeroesToSlots();

        }, (error: HttpErrorResponse) => this.handleError(error));
      }
    });
  }

  start(): void {
    this.missionsRepository.startMission(this.mission.id, this.heroAssignmentState.heroIds).subscribe(
      success => {
        const extras = {queryParams: {state: MissionState.Available}};
        this.router.navigate([MissionComponent.missionsPath], extras).then()
      }, error => this.handleError(error)
    );
  }

  openLoot(id: number): void {
    this.logger.info("changing to true for: ", id);
    this.loots[id] = true;
  }

  private handleError(error: HttpErrorResponse): void {
    this.logger.error("http error: ", error);
    this.ngbModal.open(NetworkErrorComponent, {centered: true});
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
