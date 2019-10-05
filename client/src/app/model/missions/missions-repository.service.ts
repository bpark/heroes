import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Mission} from "./missions.model";
import {AbstractRepository} from "../abstract-repository";
import {Observable} from "rxjs";
import {EntityCacheService} from "../entity-cache.service";

@Injectable({
  providedIn: 'root'
})
export class MissionsRepositoryService extends AbstractRepository<Mission> {

  private static readonly apiPath = 'missions';

  constructor(protected http: HttpClient, protected entityCache: EntityCacheService) {
    super(http, entityCache, MissionsRepositoryService.apiPath)
  }

  startMission(id:number, heroIds: number[]): Observable<any> {
    this.entityCache.clear();
    return this.http.post(this.createConnectionUrl(id + "/heroes"), {heroes:heroIds});
  }
}
