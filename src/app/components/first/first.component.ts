import { Component, OnInit } from '@angular/core';
import NavigatorHelper from 'src/app/libs/helpers/navigator.helper';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
  position: any = {};
  constructor() {}

  ngOnInit(): void {
    NavigatorHelper.getDevices()
  }

  getLocation() {
    NavigatorHelper.getLocation().then((pos) => {
      console.log(pos);
    });
  }

  getLocationC() {
    NavigatorHelper.getLocationC(
      (position) => {
        console.log(position);
        this.position = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startRecord(video: HTMLVideoElement, stop: HTMLElement) {
    console.log(video);
    NavigatorHelper.startRecord(video, stop);
  }

  startAudio(audio: HTMLAudioElement, stop: HTMLElement) {
    console.log(audio);
    NavigatorHelper.startAudio(audio, stop);
  }


}
