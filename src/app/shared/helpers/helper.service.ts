import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  DataEncoding(obj: any) {
    var p = [];
    for (var key in obj) {
      p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
  }
}
