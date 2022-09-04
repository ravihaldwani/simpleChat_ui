import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  name!: string;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userService: UserService) { }

  ngOnInit() {
  }

  onClick(): void {
    const user = this.userService.createUser(this.name);
    this.dialogRef.close(user);
  }


}
