import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroAssignmentStateService {

  private _missionId: number = null;
  heroIds: number[] = [];
  slots: number = null;

  constructor() { }

  reset(): void {
    this.missionId = null;
    this.heroIds = [];
    this.slots = null;
  }

  get missionId(): number {
    return this._missionId;
  }

  set missionId(value: number) {
    console.log("missionId: " + value);
    this._missionId = value;
  }

}
