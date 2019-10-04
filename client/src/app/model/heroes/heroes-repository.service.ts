import { Injectable } from '@angular/core';
import {AbstractRepository} from "../abstract-repository";
import {HttpClient} from "@angular/common/http";
import {Hero} from "./heroes.model";

@Injectable({
  providedIn: 'root'
})
export class HeroesRepositoryService extends AbstractRepository<Hero> {

  private static readonly apiPath = 'heroes';

  constructor(protected http: HttpClient) {
    super(http, HeroesRepositoryService.apiPath)
  }

}
