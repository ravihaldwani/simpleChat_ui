import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/core/services/group/group.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService;
  }
}
