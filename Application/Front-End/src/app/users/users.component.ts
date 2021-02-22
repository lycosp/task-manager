import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConnectionService } from '../connection.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserDataSource;

  displayedColumns: string[] = ['id', 'username', 'privilege'];

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.dataSource = new UserDataSource(this.connectionService);
  }

}

export class UserDataSource extends DataSource<User> {
  data = this.connectionService.getUsers();

  constructor(private connectionService) {
    super();
  }

  connect(): Observable<User[]> {
    return this.connectionService.getUsers();
  }

  disconnect(): void { }
}
