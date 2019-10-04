import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export class AbstractRepository<T> {

  constructor(protected http: HttpClient, private apiUrl: string) {
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.createConnectionUrl(), {});
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(this.createConnectionUrl(id), {});
  }

  private createConnectionUrl(id?: number): string {
    if (!environment.production) {
      if (id) {
        return 'http://localhost:5000/' + this.apiUrl + '/' + id;
      } else {
        return 'http://localhost:5000/' + this.apiUrl;
      }
    } else {
      if (id) {
        return 'http://localhost:5000/' + this.apiUrl + '/' + id;
      } else {
        return 'http://localhost:5000/' + this.apiUrl;
      }
      /*
      if (id) {
        return 'http://localhost:8080/api/' + this.apiUrl + '/' + id;
      } else {
        return 'http://localhost:8080/api/' + this.apiUrl;
      }*/
    }
  }
}
