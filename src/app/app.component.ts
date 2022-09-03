import { Component } from '@angular/core';
import { SseService } from './core/services/sse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chatApp';

  constructor(private sseService: SseService) {}

  ngOnInit() {
    this.sseService
      .getServerSentEvent('http://localhost:8080/chat/id/1')
      .subscribe(console.log);
  }
}
