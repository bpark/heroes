import { Component, OnInit } from '@angular/core';
import {Hero} from "../model/heroes/heroes.model";
import {HeroesRepositoryService} from "../model/heroes/heroes-repository.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = null;

  constructor(private heroRepository: HeroesRepositoryService) { }

  ngOnInit() {
    this.heroRepository.list().subscribe(result => {
      this.heroes = result;
      console.log(result)
    });
  }

}
