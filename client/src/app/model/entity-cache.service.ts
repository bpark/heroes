import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityCacheService {

  private cache = {};

  constructor() { }

  putItems<T>(key: string, items: T[]): void {
    console.log("caching items for ", key);
    this.cache[key] = items;
  }

  getItems<T>(key: string): T[] {
    return this.cache[key];
  }

  clear() {
    console.log("clearing cache");
    this.cache = {};
  }
}
