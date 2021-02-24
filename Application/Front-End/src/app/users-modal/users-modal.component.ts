import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { Privilege } from 'src/models/privilege.model';
import { ConnectionService } from '../connection.service';
import { DialogData } from '../users/users.component';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css'],
})
export class UsersModalComponent implements OnInit, OnDestroy {
  userForm = new FormGroup({
    idControl: new FormControl(''),
    userControl: new FormControl('', Validators.required),
    privControl: new FormControl('', Validators.required),
  });
  user: User;
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
      this.userForm.controls['idControl'].setValue(results.id);
      this.userForm.controls['userControl'].setValue(results.username);
      this.userForm.controls['privControl'].setValue(results.privilegeId);
    });
  }

  /**
   * create subscription to getPrivs$ that retrieves list of privileges
   */
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
    });
  }

  updateUser(): void {
    const sendData = {
      ID: this.userForm.controls['idControl'].value,
      USERNAME: this.userForm.controls['userControl'].value,
      PRIVILEGE_ID: this.userForm.controls['privControl'].value
    }
    this.connectionService.updateUser$(sendData).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe();
    this.closeModal();
  }

  removeUser(): void {
    const sendData = this.userForm.controls['idControl'].value;
    this.connectionService.removeUser$(sendData).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe();
    this.closeModal();
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
