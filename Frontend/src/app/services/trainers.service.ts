import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environmnets/environments';


export interface Trainer {
  _id: String,
  name: String,
  phone: String,
  address: String,
  email: String,
  class: String,
  __v: Number
}

@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  constructor(private http: HttpClient) { }
  updateTrainersTable = new EventEmitter<boolean>();
  @Output() editTrainer = new EventEmitter<Trainer>();
  url = environment.url;

  viewAll() {
    return this.http.get<{ [key: string]: Trainer }>(this.url + '/trainers')
      .pipe(map((response) => {
        const trainers = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            trainers.push({ ...response[key] })
          }
        }
        return trainers;
      })
      );
  }

  registerTrainer(trainer) {
    return this.http.post<Trainer>(this.url + '/trainers', trainer);
  }

  getTrainer(id: any) {
    return this.http.get<{ [key: string]: Trainer }>(this.url + `/trainers/${id}`);
  }

  edit(trainer: Trainer) {
    return this.http.patch<Trainer>(this.url + `/trainers/${trainer._id}`, trainer);
  }

  delete(id: string) {
    return this.http.delete(this.url + `/trainers/${id}`);
  }
}
