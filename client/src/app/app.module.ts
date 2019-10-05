import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientModule} from "@angular/common/http";
import {MissionsComponent} from './missions/missions.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {HeroesComponent} from './heroes/heroes.component';
import {FooterComponent} from './footer/footer.component';
import {MissionComponent} from './mission/mission.component';
import {EntityCacheService} from "./model/entity-cache.service";

const appRoutes: Routes = [
//  { path: 'crisis-center', component: CrisisListComponent },
//  { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroesComponent,
  },
  {
    path: 'missions/:id',
    component: MissionComponent,
  },
  {
    path: 'missions/:id/heroes',
    component: HeroesComponent,
  },
  {
    path: 'missions',
    component: MissionsComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MissionsComponent,
    HomeComponent,
    HeroesComponent,
    FooterComponent,
    MissionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [EntityCacheService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
