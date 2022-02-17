import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Title } from '../model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute,private service: ServiceService) { }

  ngOnInit(): void {    
    this.getTitles();
  }

  titles: Array<Title> = [];
  titlelist: Array<Title> = [];

  getTitles() {
    this.service.getTitle().subscribe((result) => {
      this.titles = result;
      this.getPageEvent(this.pageEvent);      
    });
  }
  displayedColumns: string[] = ['actions', 'id', 'text', 'categoryId'];
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 5,
    length: 0,
  };
  length: number | undefined;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  // MatPaginator Output

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  getPageEvent(event: any) {
    const firstIndex = event.pageIndex * event.pageSize;
    const lastIndex = firstIndex + event.pageSize;
    this.titlelist = this.titles.slice(firstIndex, lastIndex);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = this.titles.length;
  }

  get isUserAuthenticated() {
    return this.service.isAuthenticated;
  }
  
}
