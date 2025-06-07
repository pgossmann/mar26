import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  sendMessage(message: string, context: unknown): Observable<string> {
    return new Observable(observer => {
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
      })
        .then(resp => {
          const reader = resp.body?.getReader();
          if (!reader) {
            observer.error(new Error('No response body'));
            return;
          }
          const decoder = new TextDecoder();
          const read = () => {
            reader.read().then(({ value, done }) => {
              if (done) {
                observer.complete();
                return;
              }
              observer.next(decoder.decode(value));
              read();
            });
          };
          read();
        })
        .catch(err => observer.error(err));
    });
  }
}
