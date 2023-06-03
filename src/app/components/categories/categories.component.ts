import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any
  category_form!: FormGroup
  edit: any
  category: any
  submit: boolean = false;
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;

  constructor(private http: HttpService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.category_form = this.fb.group({
      title: new FormControl("", [Validators.required,]),
    })
    this.http.get("categories").subscribe((data) => {
      if (data.status === 200) {
        this.categories = data.body
      }
    })
  }
  get f() { return this.category_form.controls; }
  showChildModal(category: any): void {
    console.log(category);
    this.childModal?.show();
    this.edit = true
    this.category = category
    this.category_form.patchValue({
      title: category.title,
    })
  }
  add_category() {
    this.category = null
    this.edit = false
    this.category_form.reset()
    this.childModal?.show();
    this.submit = false
  }
  hideChildModal(): void {
    this.childModal?.hide();
  }
  manage_category() {
    this.submit = true
    if (this.category_form.invalid) {
      return
    }
    const fd = new FormData()
    fd.append('title', this.category_form.value.title)
    if (this.edit) {
      fd.append('id', this.category.id)
      this.http.post('edit_category/', fd).subscribe((res: any) => {
        if (res?.status == 200) {
          console.log(res);
          Object.assign(this.category, res.body)
          this.hideChildModal()
        }
      }, (error) => {
        // Handle any errors
      })
    } else {
      this.http.post('add_category', fd).subscribe((res: any) => {
        if (res?.status == 200) {
          this.categories.push(res.body)
          this.hideChildModal()
        }
      }, (error) => {
      })
    }

  }
  delete_product() {
    this.http.delete("delete_category?id=" + this.category.id).subscribe(res => {
      console.log(res);
      if (res?.status == 200) {
        this.categories.splice(this.categories.indexOf(this.category), 1)
        this.hideChildModal()
      }

    })
  }
}
