import {Injectable} from '@angular/core';
import {AbstractRepository} from "../abstract-repository";
import {HttpClient} from "@angular/common/http";
import {Hero} from "./heroes.model";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesRepositoryService extends AbstractRepository<Hero> {

  private static readonly apiPath = 'heroes';

  private heroes: Hero[];

  constructor(protected http: HttpClient) {
    super(http, HeroesRepositoryService.apiPath)
  }


  list(): Observable<Hero[]> {

    if (this.heroes) {
      return of(this.heroes);
    } else {
      return super.list().pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.heroes = data)
      );
    }
  }

}
