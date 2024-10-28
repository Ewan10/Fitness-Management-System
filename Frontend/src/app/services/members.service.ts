import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environmnets/environments';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Member {

  _id: String,
  name: String,
  age: Number,
  address: String,
  phone: String,
  classes: Array<string>,
  __v: Number
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }
  updateMembersTable = new EventEmitter<boolean>();
  @Output() editMember = new EventEmitter<Member>();
  url = environment.url;

  viewAll() {
    return this.http.get<{ [key: string]: Member }>(this.url + '/members')
      .pipe(map((response) => {
        const members = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            members.push({ ...response[key] })
          }
        }
        return members;
      })
      );
  }

  registerMember(member) {
    return this.http.post<Member>(this.url + '/members', member);
  }

  getMember(id: any) {
    return this.http.get<{ [key: string]: Member }>(this.url + `/members/${id}`);
  }

  edit(member: Member) {
    return this.http.patch<Member>(this.url + `/members/${member._id}`, member);
  }

  delete(id: string) {
    return this.http.delete(this.url + `/members/${id}`);
  }

}
