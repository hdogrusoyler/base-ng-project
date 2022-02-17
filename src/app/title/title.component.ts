import { Component, OnInit } from '@angular/core';
import { Category, Title } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
    
  }

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      if(params['titleId']){
        this.getTitleById(params['titleId']);
      }      
    });
    this.createTitleUpdateForm();
    this.getCategories();
  }

  title: Title = new Title;
  categories: Array<Category> = []; 
  titleUpdateForm!: FormGroup;

  getTitleById(id:any) {
    this.service.getTitleById(id).subscribe((result) => {
      this.title = result;
      if(this.title){
        this.setTitleFormValue(this.title);
      }      
    });
  }

  createTitleUpdateForm() {
    this.titleUpdateForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      text: [null, Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  setTitleFormValue(data:Title) {
    this.titleUpdateForm.setValue({ 
      id:data.id,
      text:data.text,
      categoryId:data.categoryId
    });
    
  }
 
  onDeleteTitle() {
    this.service.deleteTitle(this.title.id).subscribe((r) => {
      this.router.navigate(['/']);
    });
  }

  onUpdateTitle(formData: any, formDirective: FormGroupDirective) {    
    if (this.titleUpdateForm.valid) {
      this.titleUpdateForm.value.id = this.title.id;
      this.service.setUpdateTitle(this.titleUpdateForm.value).subscribe((r) => {
        this.router.navigate(['/']);
      });
    }
  }
 
  get isUserAuthenticated() {
    return this.service.isAuthenticated;
  }

  getCategories() {
    this.service.getCategory().subscribe(data => { 
      this.categories = data; 
    });
  }

  compareFn(c1: object, c2: object): boolean {
    return c1 && c2 ? c1 == c2 : c1 === c2
  }


}
