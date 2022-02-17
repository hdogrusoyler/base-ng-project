import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute,private service: ServiceService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  form: boolean = true;
  categoryId!: string;
  categories: Array<Category> = [];
  categorylist: Array<Category> = [];

  categoryForm(){
    this.form = !this.form;
    this.categoryId = '';
  }

  getCategories() {
    this.service.getCategory().subscribe((result) => {
      this.categories = result;
      this.getPageEvent(this.pageEvent);      
    });
  }
  displayedColumns: string[] = ['actions', 'id', 'text'];
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
    this.categorylist = this.categories.slice(firstIndex, lastIndex);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = this.categories.length;
  }
  
  getCategory(id:any){
    this.categoryId = id;
    this.form = !this.form;
  }
}
