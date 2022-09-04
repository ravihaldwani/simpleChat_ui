import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { GroupService } from 'src/app/core/services/group/group.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, OnDestroy {
  groups: ChatGroup[] = [];
  subscription = new Subscription();
  user: User | null = null;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    if (!this.user) {
      this.openAddUserDialog().subscribe((user) => (this.user = user));
    }
    const sub = this.groupService
      .getAllGroups()
      .subscribe((group) => this.groups.push(group));
    this.subscription.add(sub);
  }

  onCreateGroup() {
    this.groupService
      .createGroup(this.user!.fullName, 'Group1')
      .subscribe(console.log);
  }

  openAddUserDialog(): Observable<User> {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '250px',
    });
    return dialogRef.afterClosed();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
