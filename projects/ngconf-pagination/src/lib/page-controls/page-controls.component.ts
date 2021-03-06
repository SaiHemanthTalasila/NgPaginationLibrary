import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

export interface opt {
  currentPage: any;
  itemsPerPage: any;
  dataLength: any;
}

@Component({
  selector: 'pagination-controls',
  templateUrl: './page-controls.component.html',
  styleUrls: ['./page-controls.component.scss']
})
export class PageControlsComponent implements OnInit, OnChanges {
  @Input() controls: opt;
  @Output() pageChange = new EventEmitter<any>();

  totalPage: any = 0;
  pageTabArray: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.totalPages();
  }

  navigateTo(pageIndex) {
    this.pageChange.emit(pageIndex);
  }

  nextPage() {
    if ((this.controls.currentPage + 1) <= this.totalPage) {
      this.pageChange.emit(this.controls.currentPage + 1);
    }
  }
  prevPage() {
    if ((this.controls.currentPage - 1) > 0) {
      this.pageChange.emit(this.controls.currentPage - 1);
    }
  }
  totalPages() {
    this.totalPage = Math.ceil((this.controls.dataLength / this.controls.itemsPerPage));
  }

  pageTabs() {
    this.pageTabArray = []; // Clearing the page links for caluculation
    // Pushing the page numbers into the array
    for (let k = 1; k <= this.totalPage; k++) {
      this.pageTabArray.push({
        pageNumber: k,
        isEnable: false
      });
    }
    // Based on the current page we have filter the Page links instead of showing all the pages available   
    let currentPageIndex = (this.controls.currentPage - 1);
    let k = currentPageIndex;
    // Enable or disable page links based on the position of link to the current page    
    while (k != -1) {
      let count = 0;
      // Previous three available page links before current page      
      if (this.pageTabArray[k]) {
        if (k != currentPageIndex) {
          if (k == (currentPageIndex - 1) || k == (currentPageIndex - 2) || k == (currentPageIndex - 3)) {
            this.pageTabArray[k].isEnable = true;
            count++;
            if (count == 3) {
              // This IF clause will only pass maximum 3 times so to reduce computation break is used            
              break
            }
          }
        }
      }
      k--;
    }

    for (let k = currentPageIndex; k < (currentPageIndex + 4); k++) {
      // Next three available page links after current page
      if (this.pageTabArray[k]) {
        this.pageTabArray[k].isEnable = true;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.totalPages();
    this.pageTabs();
  }
}
