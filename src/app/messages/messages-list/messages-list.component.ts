import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit{
  private messagesService = inject(MessagesService)
  private cdRef = inject(ChangeDetectorRef) // change detection will be triggered manually
  private destroyRef = inject(DestroyRef)
  // get messages() {
  //   return this.messagesService.allMessages
  // }
  messages : string[] = []
  ngOnInit(): void {
    const onMessagesSubscription = this.messagesService.messages$.subscribe((response) => {
      this.cdRef.markForCheck();
      this. messages = response
    });
    this.destroyRef.onDestroy(() => { // will be impl;mented when component is destroyed
      onMessagesSubscription?.unsubscribe();
    })
  }


  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
