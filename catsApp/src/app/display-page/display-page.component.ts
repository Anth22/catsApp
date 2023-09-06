import { Component, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CatDataSetService } from '../cat-data-set.service';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.scss']
})

/**Page d'affichage de tous les chats avec leur nombre de like */
export class DisplayPageComponent {
  dataSetCats: any;
  catDataSetSubscription : Subscription

  constructor(private catService:CatDataSetService){
    this.catDataSetSubscription = this.catService.catDataSetSubscription$.subscribe(value => {
      this.dataSetCats = value
    })
  }
  

  ngOnDestroy(){
    this.catDataSetSubscription.unsubscribe();
  }
}
