import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionService } from '../connection.service';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  gettingData: boolean = false;
  user: User;

  dataSource: UserDataSource;
  displayedColumns: string[] = ['id', 'username', 'privilege', 'action'];

  constructor(private connectionService: ConnectionService, private dialog: MatDialog) { }

  ngOnInit(): void { 
    this.dataSource = new UserDataSource(this.connectionService);
  };

  openDialog(arg: string, userID: string): void {
    let data: User;
    if (arg === 'edit') {
      this.connectionService.getUser({id: userID}).subscribe(result => {
        data = result;
      });
      console.log(data);
    }
  }

}

export class UserDataSource extends DataSource<User> {

  constructor(private connectionService) {
    super();
  }

  connect(): Observable<User[]> {
    return this.connectionService.getUsers();
  }

  disconnect(): void { }
}
