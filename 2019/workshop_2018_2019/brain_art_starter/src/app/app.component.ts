import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { MuseClient, MuseControlResponse, zipSamples, EEGSample } from 'muse-js';
import { Observable, Subject } from 'rxjs';
import { map, share, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Ten Twenty System';

  // connecting = false;
  // connected = false;
  // data: Observable<EEGSample> | null;
  // controlResponses: Observable<MuseControlResponse>;
  // destroy = new Subject<void>();
  //
  // private muse = new MuseClient();
  //
  // constructor(private cd: ChangeDetectorRef) {
  // }

  ngOnInit() {
    // this.muse.connectionStatus.pipe(
    //   takeUntil(this.destroy)
    // ).subscribe(status => {
    //   this.connected = status;
    //   this.data = null;
    // });
  }
  //
  // ngOnDestroy() {
  //   this.destroy.next();
  // }
  //
  // async connect() {
  //   this.connecting = true;
  //
  //   await this.muse.connect();
  //   this.controlResponses = this.muse.controlResponses;
  //   await this.muse.start();
  //
  //   this.data = this.muse.eegReadings.pipe(
  //     zipSamples,
  //     takeUntil(this.destroy),
  //     tap(() => this.cd.detectChanges()),
  //     share()
  //   );
  //
  //   await this.muse.deviceInfo();
  // }
  //
  // disconnect() {
  //   this.muse.disconnect();
  // }
}
