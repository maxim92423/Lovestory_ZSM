import { Component, OnInit, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { log } from 'util';

@Component({
  selector: 'app-one-page',
  templateUrl: './one-page.component.html',
  styleUrls: ['./one-page.component.scss']
})
export class OnePageComponent implements OnInit, OnDestroy {
  private future: Date = new Date(2018, 6, 14, 10);
  private diff: number;
  private $counter: Observable<number>;
  private subscription: Subscription;
  public day = '0';
  public hour = '0';
  public minute = '0';
  public second = '0';

  constructor() {
  }

  private dhms(time: number) {
      let days, hours, minutes, seconds;
      days = Math.floor(time / 86400);
      time -= days * 86400;
      hours = Math.floor(time / 3600) % 24;
      time -= hours * 3600;
      minutes = Math.floor(time / 60) % 60;
      time -= minutes * 60;
      seconds = time % 60;

      return [days, hours, minutes, seconds];
  }

  ngOnInit() {
      this.$counter = Observable.interval(1000).map(tick => {
          this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
          return tick;
      });

      this.subscription = this.$counter.subscribe(() => {
        this.day = this.dhms(this.diff)[0];
        this.hour = this.dhms(this.diff)[1];
        this.minute = this.dhms(this.diff)[2];
        this.second = this.dhms(this.diff)[3];
      });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
