import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { ConnectionService } from '../connection.service';

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
  displayedColumns = ['id', 'username', 'privilege'];

  constructor(private connectionService: ConnectionService) { }

  getUsers(): void {
    let userData: User[] = [];
    this.connectionService.getUsers().pipe(takeUntil(this.ngUnsubscribe)).subscribe(results => {
      for (let i = 0; i < results.length; i++) {
        userData[i] = this.user = {
          id: results[i]['ID'],
          username: results[i]['USERNAME'],
          privilegeId: results[i]['PRIVILEGE_ID'],
          privilege: results[i]['PRIVILEGE'],
        };
      }
      this.dataSource = new MatTableDataSource(userData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }), 1;
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
