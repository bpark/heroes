import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
