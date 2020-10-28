import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Client, Message, over, StompSubscription} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';
import {filter, first, switchMap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {WsConsumer} from './ws-consumer';

export const WS_ENDPOINT = environment.wsEndpoint;
export const RECONNECT_INTERVAL = environment.wsReconnectInterval;

export enum SocketClientState {
  ATTEMPTING, CONNECTED
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private client: Client;
  private state: BehaviorSubject<SocketClientState>;
  private recTimeout = null;
  private consumers: WsConsumer[] = [];

  constructor() {
    this.connectSockJs();
  }

  static jsonHandler(message: Message): any {
    return JSON.parse(message.body);
  }

  private connectSockJs(): void {
    this.client = over(new SockJS(WS_ENDPOINT));
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    this.client.connect({}, () => {
      this.state.next(SocketClientState.CONNECTED);
      clearTimeout(this.recTimeout);
      this.consumers.forEach(c => c.initWs());
    }, () => {
      this.recTimeout = setTimeout(() => {
        this.connectSockJs();
      }, 5000);
    });
  }


  private connect(): Observable<Client> {
    return new Observable<Client>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
        observer.next(this.client);
      });
    });
  }

  ngOnDestroy(): void {
    this.connect().pipe(first()).subscribe(inst => inst.disconnect(null));
  }

  onMessage(topic: string, wsConsumer: WsConsumer,  handler = WebsocketService.jsonHandler): Observable<any> {
    this.consumers.push(wsConsumer);
    return this.connect().pipe(first(), switchMap(inst => {
      return new Observable<any>(observer => {
        const subscription: StompSubscription = inst.subscribe(topic, message => {
          observer.next(handler(message));
        });
        return () => inst.unsubscribe(subscription.id);
      });
    }));
  }

  send(topic: string, payload: any): void {
    this.connect()
      .pipe(first())
      .subscribe(inst => inst.send(topic, {}, JSON.stringify(payload)));
  }

}
