import { Component } from '@angular/core';
import { ChatService } from './core/services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect();
  }
}
