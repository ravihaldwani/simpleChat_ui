import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { GroupService } from 'src/app/core/services/group/group.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {
  @ViewChildren('messages') messages!: QueryList<any>;
  @ViewChild('content') content!: ElementRef;

  constructor(
    private groupService: GroupService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  private subscription = new Subscription();
  private groupId!: string;
  private user!: User;
  group$!: Observable<ChatGroup>;
  chats: Chat[] = [];
  ws!: WebSocketSubject<Chat>;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser() as User;
    this.groupId = this.activatedRoute.snapshot.params['id'];
    this.group$ = this.groupService.getGroupById(this.groupId);
    const sub = this.chatService
      .getMessages()
      .subscribe((chat) => this.chats.push(chat));
    this.chatService.enterGroup(this.groupId);
    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop =
        this.content.nativeElement.scrollHeight;
    } catch (err) {}
  };

  onSend(value: string) {
    if (!value) return;
    const body: Chat = {
      groupId: this.groupId,
      message: value,
      receiver: '',
      sender: this.user.fullName,
    };

    this.chatService.send(body);
  }
}
