import {Component, OnInit} from '@angular/core';
import {Hero} from "../model/heroes/heroes.model";
import {HeroesRepositoryService} from "../model/heroes/heroes-repository.service";
import {HeroAssignmentStateService} from "../model/state/hero-assignment-state.service";
import {Location} from "@angular/common";
import NameGen from "../model/namegen";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = null;
  selectionMode: boolean = false;

  constructor(private heroRepository: HeroesRepositoryService,
              private heroAssignmentState: HeroAssignmentStateService,
              private location: Location) { }

  ngOnInit() {
    this.heroRepository.list().subscribe(result => {
      this.heroes = result;
      let generator = new NameGen.Generator(NameGen.FANTASY_N_L);
      this.heroes.forEach(h => {
        let name = generator.toString();
        h.name = name.charAt(0).toUpperCase() + name.slice(1);
      });
      this.selectionMode = this.heroAssignmentState.missionId != null;
      console.log("selectionMode: " + this.selectionMode);
      console.log(result)
    });
  }

  select(id: number): void {
    console.log("selecting: " + id);
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
    console.log("pushing back");
    this.location.back();
  }
}
