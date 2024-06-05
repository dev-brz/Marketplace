import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Client } from '@stomp/stompjs';
import { timer } from 'rxjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  stomp = new Client({ webSocketFactory: () => new SockJS(`http://localhost:8080/ws`) });

  ngOnInit(): void {
    this.stomp.onConnect = () => {
      this.stomp.subscribe('/topic/chat/broadcast', (message) => console.log(`Received ${message.body}`));

      timer(3000).subscribe(() => {
        const frame = { destination: '/app/chat', body: JSON.stringify({ content: 'hello world'}) };
        this.stomp.publish(frame);
      });
    };
    
    this.stomp.activate();
  }

  ngOnDestroy(): void {
    this.stomp.deactivate();
  }
}
