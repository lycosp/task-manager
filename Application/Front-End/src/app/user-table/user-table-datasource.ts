import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { User } from '../../models/user.model';

export class UserTableDataSource extends DataSource<User> {

  data: User[];
  paginator: MatPaginator;
  sort: MatSort;
  user: User;

  constructor(private userData) {
    super();
    this.data = this.userData;
  }

  connect(): Observable<User[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];
    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() { }

  // paginate data
  private getPagedData(data: User[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  // sort data
  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction !== 'asc';
      switch (this.sort.active) {
        case 'username': return this.compare(a.username, b.username, isAsc);
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'privilege': return this.compare(a.privilege, b.privilege, isAsc);
        default: return 0;
      }
    });
  }

  // compare parameters for sorting
  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}


