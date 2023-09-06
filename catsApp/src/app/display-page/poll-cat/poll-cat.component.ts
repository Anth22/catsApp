import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, Subscription } from 'rxjs';
import { CatDataSetService } from 'src/app/cat-data-set.service';

const THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;

@Component({
  selector: 'app-poll-cat',
  templateUrl: './poll-cat.component.html',
  styleUrls: ['./poll-cat.component.scss']
})
/**Page de sondage pour voter sur les images de chats qui prefère */
export class PollCatComponent {
  // MatPaginator Inputs
  length: number = 0;
  pageSize: number = 3;  //displaying three cards each row
  pageSizeOptions: number[] = [3, 6, 9, 25];
  dataSetCatsFiltre:any = []

  click : boolean = false
  dataSetCats: any;
  catDataSetSubscription : Subscription

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private catService:CatDataSetService) {
    // Note that we provide the icon here as a string literal here due to a limitation in
    // Stackblitz. If you want to provide the icon from a URL, you can use:
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
    this.catDataSetSubscription = this.catService.catDataSetSubscription$.subscribe(value => {
      this.dataSetCats = value
      this.dataSetCatsFiltre = [].concat(value);  
      this.dataSetCatsFiltre = this.dataSetCatsFiltre.slice(0, this.pageSize)
      this.length = this.dataSetCats?.length     /**Nombre total d'images de chat pour la pagination*/
    })
  }

  vote(cat:any){
    if (cat.like===undefined){
      cat.like = 0
    }
    /** L'utilisateur n'a pas encore like. On comptabilise sont like */
    if (cat.bJeLike&&cat.bJeLike!=undefined){
      cat.bJeLike = false
    }
    else {
      cat.bJeLike = true
    }
    cat.like = cat.like +1
    this.catService.catDataSetSubscription$.next(this.dataSetCats)
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.dataSetCatsFiltre = this.dataSetCats.slice(startIndex, endIndex)
  }

  ngOnDestroy(){
    this.catDataSetSubscription.unsubscribe();
  }
}
