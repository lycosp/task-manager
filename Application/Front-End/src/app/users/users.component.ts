import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { ConnectionService } from '../connection.service';
import { UsersModalComponent } from '../users-modal/users-modal.component';

export interface DialogData {
  action: string;
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
  ) { }

  /**
   * make subscription to getUsers$ observable to get a list of all users
   */
  getUsers(): void {
    this.connectionService.getUsers$().pipe(
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
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe(results => {
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * opens user-modal to add/delete users
   * @param action pass add, edit or delete to determine the modal functionality
   * @param user pass username data into user-modal
   */
  openDialog(action: string, user: string): void {
    let head;
    switch (action) {
      case 'add':
        head = 'Add User'
        break;
      case 'edit':
        head = 'Edit User: '
        break;
      case 'delete':
        head = 'Delete User: '
        break;
    }

    const dialogRef = this.dialog.open(UsersModalComponent, {
      width: '15%', height: 'auto',
      data: { action: action, head: head, username: user },
    });

    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.getUsers();
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
