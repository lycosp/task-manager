import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserTableDataSource } from './user-table-datasource';
import { User } from '../../models/user.model';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  dataSource: UserTableDataSource;
  user: User;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'username', 'privilege'];

  constructor(private connectionService: ConnectionService) {
    this.user = new User();
  }

  getUsers(): User[] {
    let userData: User[] = [];
    this.connectionService.getUsers().subscribe(results => {
      for (let i = 0; i < results.length; i++) {
        userData[i] = this.user = {
          id: results[i]['ID'],
          username: results[i]['USERNAME'],
          privilegeId: results[i]['PRIVILEGE_ID'],
          privilege: results[i]['PRIVILEGE']
        }
      }
    });
    return userData;
  }

  ngOnInit() {
    this.dataSource = new UserTableDataSource(this.getUsers());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
