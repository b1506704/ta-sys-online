import { Component, NgModule, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: 'chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss'],
})
export class ChatUserListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() userList: Array<any> = [];
  @Input() roomTitle: string;
  @Input() roomNumber: string;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    console.log(this.userList);
  }

  ngOnDestroy() {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ChatUserListComponent],
  exports: [ChatUserListComponent],
})
export class ChatUserListModule {}
