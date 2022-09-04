import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, switchMap } from 'rxjs';
import { GroupService } from 'src/app/core/services/group/group.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AddUserDialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, OnDestroy {
  groups: ChatGroup[] = [];
  subscription = new Subscription();
  user!: User;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

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
      this.openDialog().pipe(switchMap(
        (user) => this.groupService.createGroup(user.fullName, 'Group1')
      )).subscribe(console.log);
    } else {
      this.groupService
        .createGroup(user.fullName, 'Group1')
        .subscribe(console.log);
    }
  }

  openDialog(): Observable<User> {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '250px',
    });
    return dialogRef.afterClosed();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
