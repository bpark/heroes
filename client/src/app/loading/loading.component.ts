import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from "../infrastructure/loading/loading.service";
import {debounceTime} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  isLoading: boolean;

  private loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.isLoading().pipe(debounceTime(500)).subscribe(value => {
      this.isLoading = value;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
