import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { SseService } from '../sse.service';
import { environment as env } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';
import { ChatActionType } from '../../model/action';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private API_URL = env.baseUrl + '/chats';
  private ws = webSocket<any>('ws://localhost:8080/ws/chat');
  private subject = new Subject<any>();
  private subscription = new Subscription();

  constructor(private http: HttpClient, private sseService: SseService) {}

  getChatById(groupId: string): Observable<Chat> {
    return this.sseService.getServerSentEvent(this.API_URL + '/' + groupId);
  }

  send(body: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.API_URL, body);
  }

  connect(): Observable<any> {
    const sub = this.ws.subscribe(this.subject);
    this.subscription.add(sub);
    return this.subject.asObservable();
  }

  enterGroup(groupId: string) {
    const body = {
      type: ChatActionType.EnterGroup,
      groupId,
    };
    this.ws.next(body);
  }

  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }
}
