import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {EntityCacheService} from "./entity-cache.service";
import {tap} from "rxjs/operators";

export class AbstractRepository<T> {

  constructor(protected http: HttpClient,
              protected entityCache: EntityCacheService,
              private apiUrl: string) {
  }

  list(): Observable<T[]> {
    const items = this.entityCache.getItems<T>(this.apiUrl);
    if (items) {
      return of(items);
    } else {
      return this.http.get<T[]>(this.createConnectionUrl(), {}).pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.entityCache.putItems(this.apiUrl, data))
      );
    }
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(this.createConnectionUrl(id), {});
  }

  protected createConnectionUrl(id?: number|string): string {
    if (environment.production) {
      if (id) {
        return '/' + this.apiUrl + '/' + id;
      } else {
        return '/' + this.apiUrl;
      }
    } else {
      if (id) {
        return 'http://localhost:5000/' + this.apiUrl + '/' + id;
      } else {
        return 'http://localhost:5000/' + this.apiUrl;
      }
    }
  }
}
