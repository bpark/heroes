import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hero} from "../model/heroes/heroes.model";
import {HeroesRepositoryService} from "../model/heroes/heroes-repository.service";
import {HeroAssignmentStateService} from "../model/state/hero-assignment-state.service";
import {Location} from "@angular/common";
import NameGen from "../model/namegen";
import {ActivatedRoute} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";
import {NetworkErrorComponent} from "../errors/network-error/network-error.component";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {

  heroes: Hero[] = null;
  selectionMode: boolean = false;

  constructor(private heroRepository: HeroesRepositoryService,
              private heroAssignmentState: HeroAssignmentStateService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private ngbModal: NgbModal,
              private logger: NGXLogger) { }

  ngOnInit() {

    this.logger.debug("Init component HeroesComponent");

    let segments = this.activatedRoute.snapshot.url;

    this.logger.debug("segments: ", segments);

    this.heroRepository.list().subscribe(result => {
      this.processHeroes(result);
      this.selectionMode = this.heroAssignmentState.missionId != null && segments.length > 1;
    }, error => this.handleError(error));
  }

  private processHeroes(heroes: Hero[]): void {
    this.heroes = heroes;
    let generator = new NameGen.Generator(NameGen.FANTASY_N_L);
    this.heroes.forEach(h => {
      let name = generator.toString();
      h.name = name.charAt(0).toUpperCase() + name.slice(1);
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.logger.error("http error: ", error);
    this.ngbModal.open(NetworkErrorComponent, {centered: true});
  }

  /**
   * Selects or deselects a hero, depending on the previous state. If a hero should be selected then the method
   * tests if a empty slot is available.
   *
   * @param id the id of the hero.
   */
  select(id: number): void {
    this.logger.debug("selecting hero: ", id);
    const selectedHero = this.heroes.find(h => h.id === id);
    selectedHero.selected = !selectedHero.selected && (selectedHero.selected || this.canSelect());
  }

  canSelect() {
    const selectedCount = this.heroes.filter(h => h.selected).length;
    return selectedCount < this.heroAssignmentState.slots;
  }

  ok(): void {
    this.heroAssignmentState.heroIds = [];
    this.heroes.filter(h => h.selected).forEach(h => this.heroAssignmentState.heroIds.push(h.id));
    this.location.back();
  }

  ngOnDestroy(): void {
    this.logger.debug("Destroying component HeroesComponent");
  }
}
