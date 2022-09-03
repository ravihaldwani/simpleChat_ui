import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { SseService } from '../sse.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private API_URL = env.baseUrl + '/groups';

  constructor(private sseService: SseService, private http: HttpClient) {}

  getAllGroups(): Observable<ChatGroup> {
    return this.sseService.getServerSentEvent(this.API_URL);
  }

  createGroup(createdBy: string, groupName: string): Observable<ChatGroup> {
    const body: ChatGroup = { createdBy, groupName };
    return this.http.post<ChatGroup>(this.API_URL, body);
  }

  getGroupById(groupId: string): Observable<ChatGroup> {
    return this.http.get<ChatGroup>(this.API_URL + '/' + groupId);
  }
}
