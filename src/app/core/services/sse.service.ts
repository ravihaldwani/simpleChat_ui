import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  constructor(private _zone: NgZone) {}

  getServerSentEvent<T>(url: string): Observable<T> {
    console.log('SSE event get');
    return new Observable((observer) => {
      const eventSource = this.getEventSource(url);

      eventSource.onmessage = (event) => {
        this._zone.run(() => {
          console.log('Group next event');
          observer.next(JSON.parse(event.data));
        });
      };

      eventSource.onerror = (error) => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
