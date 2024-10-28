import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environmnets/environments';

export interface Class {
  _id: String,
  name: String,
  trainer: String,
  room: Number,
  numberOfMembers: Number,
  schedule: Array<String>,
  __v: Number
}

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { }

  @Output() edit = new EventEmitter<Class>();
  @Output() updateClassesTable = new EventEmitter<boolean>();
  url = environment.url;

  viewAll() {
    return this.http.get<{ [key: string]: Class }>(this.url + '/classes')
      .pipe(map((response) => {
        const _classes = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            _classes.push({ ...response[key] })
          }
        }
        return _classes;
      })
      );
  }

  getClass(id) {
    return this.http.get<{ [key: string]: Class }>(this.url + `/classes/${id}`);
  }

  sessionsToStrings(schedule) {
    let sessionsArray = [];
    for (const sess in schedule) {
      let session = '';
      let fields = [];

      for (const field in schedule[sess]) {
        fields.push(schedule[sess][field])
      }

      session = session.concat(fields[0], " ", fields[1], "-", fields[2]);
      sessionsArray.push({ session });
    }
    return sessionsArray;
  }

  createClass(_class) {
    return this.http.post<Class>(this.url + '/classes', _class);
  }

  editClass(_class) {
    return this.http.patch<Class>(this.url + `/classes/${_class._id}`, _class);
  }

  delete(id: string) {
    return this.http.delete(this.url + `/classes/${id}`);
  }
}
