import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages: string[] = [];
  public messages$ = new BehaviorSubject<string[]>([]);
  get allMessages() {
    return [...this.messages];
  }

  addMessage(message: string) {
    this.messages = [... this.messages, message];
    this.messages$.next([...this.messages]);
  }
}