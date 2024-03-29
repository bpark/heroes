//{"difficulty": 63, "duration": 60, "expires": 1570116765.0262618, "heroes": [], "id": 7, "name": "M0", "running": false}



export class Mission {
  id: number = null;
  name: string = null;
  state: MissionState = null;
  difficulty: number = null;
  duration: number = null;
  expires: number = null;
  slots: number = null;
  heroes: number[] = [];
}

export enum MissionState {
    Available = "Available",
    Started = "Started",
    Finished = "Finished"
}
