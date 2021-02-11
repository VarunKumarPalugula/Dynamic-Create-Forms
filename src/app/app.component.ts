import { Component, OnInit } from '@angular/core';
import { UppyConfig } from 'uppy-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  settings: UppyConfig = {
    uploadAPI: {
      endpoint: '' + 'files/Upload',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    },
    plugins: {
      Webcam: true,
      GoogleDrive: true,
      Instagram: true,
      Facebook: true,
      Dropbox: true,
      ScreenCapture: true,
    },
    restrictions: {
      maxFileSize: 1000000,
      maxNumberOfFiles: 10,
      minNumberOfFiles: 1,
    },
    statusBarOptions: {
      hideAfterFinish: false,
    },
    uploaderLook: {
      theme: '',
    },
    options: {
      autoProceed: false,
    },
  };
}
