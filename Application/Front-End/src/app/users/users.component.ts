import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { ConnectionService } from '../connection.service';
import { UsersModalComponent } from '../users-modal/users-modal.component';

export interface DialogData {
  head: string;
  username: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  user: User;

  private ngUnsubscribe = new Subject();

  // columns to be displayed
  displayedColumns = ['id', 'username', 'privilege', 'actions'];

  constructor(
    private connectionService: ConnectionService,
    public dialog: MatDialog
  ) {}

  /**
   * make a rest call to get a list of all users
   */
  getUsers(): void {
    this.connectionService
      .getUsers$()
      .pipe(
        map((data: User[]) => {
          let userData: User[] = [];
          data.forEach((user, i) => {
            userData[i] = {
              id: user['ID'],
              username: user['USERNAME'],
              privilegeId: user['PRIVILEGE_ID'],
              privilege: user['PRIVILEGE'],
            };
          });
          return userData;
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((results) => {
        this.dataSource = new MatTableDataSource(results);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(action: string, user: string): void {
    let head = action === 'edit' ? 'Edit User: ' : 'Delete User: ';

    const dialogRef = this.dialog.open(UsersModalComponent, {
      width: '40%',
      data: { head: head, username: user },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((results) => {
        console.log('dialog closed');
      });
  }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
