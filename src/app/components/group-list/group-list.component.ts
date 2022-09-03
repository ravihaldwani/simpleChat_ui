import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/core/services/group/group.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, OnDestroy {
  groups: ChatGroup[] = [];
  subscription = new Subscription();

  constructor(
    private groupService: GroupService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('Group initiated');
    const sub = this.groupService
      .getAllGroups()
      .subscribe((group) => this.groups.push(group));
    this.subscription.add(sub);
  }

  onCreateGroup() {
    let user = this.userService.getCurrentUser();
    if (!user) {
      user = this.userService.createUser('Ankit');
    }
    this.groupService
      .createGroup(user.fullName, 'Group1')
      .subscribe(console.log);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
