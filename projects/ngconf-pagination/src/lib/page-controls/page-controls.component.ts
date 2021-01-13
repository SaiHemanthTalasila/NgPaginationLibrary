import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

export interface opt{
  currentPage:any;
  itemsPerPage:any;
  dataLength:any;  
}

@Component({
  selector: 'pagination-controls',
  templateUrl: './page-controls.component.html',
  styleUrls: ['./page-controls.component.scss']
})
export class PageControlsComponent implements OnInit,OnChanges {
  @Input() controls:opt;
  @Output() pageChange = new EventEmitter<any>();
  totalPage:any = 0;
  constructor() { }
  
  ngOnInit(): void {
   this.totalPages();
  }
  nextPage(){
    if((this.controls.currentPage+1) <= this.totalPage){
      this.pageChange.emit(this.controls.currentPage + 1);
    } 
  }
  prevPage(){
    if((this.controls.currentPage-1) > 0){
      this.pageChange.emit(this.controls.currentPage - 1);
    }
  }
  totalPages(){
    this.totalPage = Math.round((this.controls.dataLength/this.controls.itemsPerPage));
  }

  ngOnChanges(changes:SimpleChanges){
      this.totalPages();
  }
}
