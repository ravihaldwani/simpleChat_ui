import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environment';
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
      .getServerSentEvent(env.baseUrl + '/chat/id/1')
      .subscribe(console.log);
  }
}
