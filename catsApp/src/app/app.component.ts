import { Component } from '@angular/core';
import { CatDataSetService } from './cat-data-set.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'catsApp';

  constructor(private catService:CatDataSetService) {
    this.catService.getCatsDataset().subscribe(data=>{
      this.catService.catDataSetSubscription$.next(data.images)
    })
  }

  ngOnInit() {}

}
