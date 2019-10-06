import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MissionNameGeneratorService {

  private static readonly prefixes = [
    "No rest for",
    "Killing",
    "Purging",
    "Exterminating"
  ];

  private static readonly suffixes = [
    "the Slayer",
    "the Arena",
    "the Enemy",
    "the Others",
    "the Rage",
  ];

  constructor() { }

  generate(id: number): string {

    const plen = MissionNameGeneratorService.prefixes.length;
    const slen = MissionNameGeneratorService.suffixes.length;

    const pindex = id % plen;
    const sindex = (id * pindex) % slen;

    const prefix = MissionNameGeneratorService.prefixes[pindex];
    const suffix = MissionNameGeneratorService.suffixes[sindex];

    return prefix + " " + suffix;
  }
}
