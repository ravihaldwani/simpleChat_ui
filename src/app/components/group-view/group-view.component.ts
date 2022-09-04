import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { GroupService } from 'src/app/core/services/group/group.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {
  constructor(
    private groupService: GroupService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  private groupId!: string;
  private user!: User;
  group$!: Observable<ChatGroup>;
  chats: Chat[] = [];

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser() as User;
    this.groupId = this.activatedRoute.snapshot.params['id'];
    this.group$ = this.groupService.getGroupById(this.groupId);
    this.chatService.getChatById(this.groupId).subscribe((chat) => {
      this.chats.push(chat);
    });
  }

  onSend(value: string) {
    if (!value) return;
    const body: Chat = {
      groupId: this.groupId,
      message: value,
      receiver: '',
      sender: this.user.fullName,
    };
    this.chatService.send(body).subscribe(console.log);
  }
}
