import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { Privilege } from 'src/models/privilege.model';
import { ConnectionService } from '../connection.service';
import { DialogData } from '../users/users.component';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css'],
})
export class UsersModalComponent implements OnInit, OnDestroy {
  userForm = new FormGroup({
    userControl: new FormControl('', Validators.required),
    privControl: new FormControl('', Validators.required)
  });
  privileges: Privilege[] = [];
  selectedValue: string;
  private ngUnsubscribe = new Subject();

  constructor(
    private connectionService: ConnectionService,
    public dialogRef: MatDialogRef<UsersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }

  /**
   * create subscription to getUser$ observable that retrives user data for selected user
   * @param sendData passes data to getUser$ observable
   */
  getUser(sendData): void {
    this.connectionService.getUser$(sendData).pipe(
      map((data: User) => {
        let user: User = {
          id: data['ID'],
          username: data['USERNAME'],
          privilegeId: data['PRIVILEGE_ID'],
          privilege: data['PRIVILEGE'],
        };
        return user;
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe(results => {
      this.setFormData(results);
    });
  }

  getPrivs(): void {
    this.connectionService.getPrivs$().pipe(
      map((data: Privilege[]) => {
        let privs: Privilege[] = [];
        data.forEach((priv, i) => {
          privs[i] = {
            id: priv['ID'],
            privilege: priv['PRIVILEGE']
          }
        });
        return privs;
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe(results => {
      this.privileges = results;
      console.log(this.privileges);
    })
  }

  setFormData(data) {
    this.userForm.controls['userControl'].setValue(data.username);
    this.userForm.controls['privControl'].setValue(data.privilegeId);
  }

  ngOnInit(): void {
    this.getUser(this.data.username);
    this.getPrivs();
  }

  ngOnDestroy(): void {
    // close subscriptions
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
