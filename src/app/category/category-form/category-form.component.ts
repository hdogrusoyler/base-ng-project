import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, OnChanges {

  constructor(
    private actRoute: ActivatedRoute,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createCategoryUpdateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['CategoryId'] !== undefined) { 
      if (changes['CategoryId'].currentValue != 0 || changes['CategoryId'].currentValue != undefined) {
        this.getCategoryById(changes['CategoryId'].currentValue);
      } 
    }
  }
  
  @Input() CategoryId!: string;
  category: Category = new Category;
  categoryUpdateForm!: FormGroup;

  getCategoryById(id:any) {
    this.service.getCategoryById(id).subscribe((result) => {
      this.category = result;
      if(this.category.id > 0){
        this.setCategoryFormValue(this.category);
      }      
    });
  }

  createCategoryUpdateForm() {
    this.categoryUpdateForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      text: [null, Validators.required]
    });
  }

  setCategoryFormValue(data:Category) {
    this.categoryUpdateForm.setValue({ 
      id:data.id,
      text:data.text
    });
    
  }
 
  onDeleteCategory() {
    this.service.deleteCategory(this.category.id).subscribe((r) => {
      this.router.navigate(['/']).then(() => this.router.navigate(['category']));
    });
  }

  onUpdateCategory(formData: any, formDirective: FormGroupDirective) {    
    if (this.categoryUpdateForm.valid) {
      this.categoryUpdateForm.value.id = this.category.id;
      this.service.setUpdateCategory(this.categoryUpdateForm.value).subscribe((r) => {
        this.router.navigate(['/']).then(() => this.router.navigate(['category']));
      });
    }
  }
 
  get isUserAuthenticated() {
    return this.service.isAuthenticated;
  }

}
