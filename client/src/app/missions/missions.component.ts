import {Component, OnInit} from '@angular/core';
import {MissionsRepositoryService} from "../model/missions/missions-repository.service";
import {Mission, MissionState} from "../model/missions/missions.model";
import {ActivatedRoute} from "@angular/router";
import {MissionNameGeneratorService} from "../model/missions/mission-name-generator.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NetworkErrorComponent} from "../errors/network-error/network-error.component";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  private static readonly stateParam = "state";

  missions: Mission[] = null;
  state: MissionState = MissionState.Available;

  constructor(private missionsRepository: MissionsRepositoryService,
              private activeRoute: ActivatedRoute,
              private missionNameGenerator: MissionNameGeneratorService,
              private ngbModal: NgbModal,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {

      this.state = params[MissionsComponent.stateParam];
      this.logger.debug("set to state: ", this.state);

      this.missionsRepository.list().subscribe(
        result => this.processMissions(result),
        (error: HttpErrorResponse) => this.handleError(error)
      );
    });
  }

  private processMissions(missions: Mission[]): void {
    missions.forEach(mission => {
      mission.name = this.missionNameGenerator.generate(mission.id)
    });
    this.missions = missions.filter(m => m.state === this.state);
    this.logger.debug("Filtered missions: ", this.missions);
  }

  private handleError(error: HttpErrorResponse): void {
    this.logger.error("failed to load data: ", error);
    this.ngbModal.open(NetworkErrorComponent, {centered: true});
  }
}
