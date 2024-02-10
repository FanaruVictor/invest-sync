// web-socket.service.ts

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket?: WebSocket;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.socket = undefined;
  }

  // connect(): Observable<any> | null {
  //   if (!isPlatformBrowser(this.platformId)) {
  //     return null;
  //   }
  //   this.socket = new WebSocket(this.endpoint);

  //   return new Observable<any>((observer) => {
  //     if (!this.socket) {
  //       return;
  //     }
  //     const handleMessage = (event: any) => {
  //       observer.next(JSON.parse(event.data));
  //     };

  //     const handleClose = (event: any) => {
  //       observer.complete();
  //     };

  //     const handleError = (event: any) => {
  //       observer.error(event);
  //     };

  //     this.socket.addEventListener('message', handleMessage);
  //     this.socket.addEventListener('close', handleClose);
  //     this.socket.addEventListener('error', handleError);

  //     // Clean up the WebSocket on unsubscribe
  //     return () => {
  //       this.socket?.removeEventListener('message', handleMessage);
  //       this.socket?.removeEventListener('close', handleClose);
  //       this.socket?.removeEventListener('error', handleError);
  //       this.socket?.close();
  //     };
  //   });
  // }

  connectAvgPrice(symbol: string): Observable<any> | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    this.socket = new WebSocket(
      `${environment.bincanceWsBaseURL}/${symbol}@avgPrice`
    );

    return new Observable<any>((observer) => {
      if (!this.socket) {
        return;
      }
      const handleMessage = (event: any) => {
        observer.next(JSON.parse(event.data));
      };

      const handleClose = (event: any) => {
        observer.complete();
      };

      const handleError = (event: any) => {
        observer.error(event);
      };

      this.socket.addEventListener('message', handleMessage);
      this.socket.addEventListener('close', handleClose);
      this.socket.addEventListener('error', handleError);

      // Clean up the WebSocket on unsubscribe
      return () => {
        this.socket?.removeEventListener('message', handleMessage);
        this.socket?.removeEventListener('close', handleClose);
        this.socket?.removeEventListener('error', handleError);
        this.socket?.close();
      };
    });
  }
}
