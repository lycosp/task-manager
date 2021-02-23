import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { ConnectionService } from '../connection.service';
import { DialogData } from '../users/users.component';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css'],
})
export class UsersModalComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  private ngUnsubscribe = new Subject();

  constructor(
    private connectionService: ConnectionService,
    public dialogRef: MatDialogRef<UsersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  // get selected user
  getUser(sendData): void {
    this.connectionService
      .getUser$(sendData)
      .pipe(
        map((data: User) => {
          let user: User = {
            id: data['ID'],
            username: data['USERNAME'],
            privilegeId: data['PRIVILEGE_ID'],
            privilege: data['PRIVILEGE'],
          };
          return user;
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((results) => {
        this.setFormData(results);
      });
  }

  setFormData(data) {}

  ngOnInit(): void {
    this.getUser(this.data.username);
    this.userForm = new FormGroup({
      userControl: new FormControl('', Validators.required),
      //privilegeControl: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    // close subscriptions
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
