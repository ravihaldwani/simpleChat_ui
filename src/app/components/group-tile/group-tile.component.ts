import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-tile',
  templateUrl: './group-tile.component.html',
  styleUrls: ['./group-tile.component.scss'],
})
export class GroupTileComponent implements OnInit {
  @Input()
  group!: ChatGroup;
  groupLink!: string;

  constructor() {}

  ngOnInit(): void {
    this.groupLink = '/groups/' + this.group.id;
  }
}
