import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class CatDataSetService {

  constructor(private _httpClient: HttpClient) {}
  catDataSet : string = "https://latelier.co/data/cats.json"

  /**
   * behaviorSubject de type any qui contient les images de chat actualisée
  */
  catDataSetSubscription$: BehaviorSubject<any> = new BehaviorSubject(null);

  /*get catDataSetSubscription() {
    return this.catDataSetSubscription$;
  }*/

  ngOnInit() {

  }

  getCatsDataset(): Observable<any>{
    return this._httpClient.get(this.catDataSet)
  }

}
