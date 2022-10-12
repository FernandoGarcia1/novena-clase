export default class NavigatorHelper {
  static getLocation(): Promise<any> {
    //let options = {
    //timeout: 3000,
    //}
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  static getLocationC(success: (key: any) => void, error: (key: any) => void) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        success(position);
      },
      (err) => {
        error(err);
      }
    );
  }
  static startRecord(videoElement: HTMLVideoElement, stop: HTMLElement) {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 800,
          height: 600,
          /*
          deviceId: {
            exact:
              '301472917eb111b0b94a1308ccb29ae14e05f89cc28fe132277a98cac4688aa1',
          },*/
        },
        audio: true,
      })
      .then((mediStream) => {
        console.log(mediStream);
        videoElement.srcObject = mediStream;
        videoElement.onloadedmetadata = (resp) => {
          videoElement.play();
          let data: any[] = [];
          const recorder = new MediaRecorder(mediStream, {
            mimeType: 'video/webm',
          });
          recorder.ondataavailable = (ev) => {
            console.log('onDataAvailable');
            data.push(ev.data);
          };
          recorder.onstop = () => {
            console.log('onStopAvailable');
            const blob = new Blob(data, {
              type: 'video/webm',
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.href = url;
            a.download = 'video.webm';
            a.click();
            console.log(url);
            //  const reader = new FileReader()
            //  reader.readAsDataURL(blob)
            //  reader.onloadend = ()=>{
            //   console.log(reader.result)
            //  }
            //console.log(URL.createObjectURL(blob))
          };
          setTimeout(() => {
            console.log('toStart');
            recorder.start();
          }, 10);
          stop.addEventListener('click', () => {
            console.log('toStop');
            recorder.stop();
          });
          // setTimeout(()=>{

          // },1000)
        };
      });
  }

  static getDevices() {
    navigator.mediaDevices.enumerateDevices().then((response) => {
      response.forEach((item) => {
        if (item.kind === 'videoinput') {
          console.log('Get devices',item);
        }
      });
    });
  }

  static startAudio(audioElement: HTMLAudioElement, stop: HTMLElement){
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((mediaStream) => {
        audioElement.srcObject = mediaStream;
        audioElement.onloadedmetadata = (resp) => {
          audioElement.play();
          let data: any[] = [];
          const recorder = new MediaRecorder(mediaStream, {
            mimeType: 'audio/webm',
          });
          recorder.ondataavailable = (ev) => {
            console.log('onDataAvailable');
            data.push(ev.data);
          };

          recorder.onstop = () => {
            console.log('onStopAvailable');
            const blob = new Blob(data, {
              type: 'audio/webm',
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.href = url;
            a.download = 'audio.webm';
            a.click();
            console.log(url);            
          }; 
          setTimeout(() => {
            console.log('toStart');
            recorder.start();
          }, 10);  
          stop.addEventListener('click', () => {
            console.log('toStop');
            recorder.stop();
          });
                 
        };
      });
  }
}
