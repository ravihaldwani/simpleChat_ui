import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SseService } from '../sse.service';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private API_URL = env.baseUrl + '/chats';

  constructor(private http: HttpClient, private sseService: SseService) {}

  getChatById(groupId: string): Observable<Chat> {
    return this.sseService.getServerSentEvent(this.API_URL + '/' + groupId);
  }

  send(body: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.API_URL, body);
  }
}
