import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-medecines',
  templateUrl: './medecines.component.html',
  styleUrls: ['./medecines.component.css']
})
export class MedecinesComponent implements OnInit {
  products: any
  submit: boolean = false;
  product_form!: FormGroup
  product: any
  edit: any
  categories: any
  imgUrl: any
  selectedFile: any = null;
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;

  constructor(private http: HttpService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.product_form = this.fb.group({
      title: new FormControl("", [Validators.required,]),
      description: new FormControl("", [Validators.required,]),
      quantity: new FormControl("", [Validators.required,]),
      price: new FormControl("", [Validators.required,]),
      image_name: new FormControl("",),
      family_id: new FormControl(null, Validators.required),
    });
    this.getProducts();
    this.get_categories();
  }
  get f() {
    return this.product_form.controls;
  }
  getProducts() {
    this.http.get('products_json').subscribe((data: any) => {

      if (data.status === 200) {
        this.products = data.body;
      }
    })
  }
  showChildModal(product: any): void {
    console.log(product);

    this.childModal?.show();
    this.edit = true
    this.product = product
    this.product_form.patchValue({
      title: product.title,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      image_name: product.image_name,
      family_id: product.family_id,
    })
    this.imgUrl = "http://127.0.0.1:8000/uploads/products/" + product.image_name
  }
  get_categories() {
    this.http.get('categories').subscribe((res: any) => {
      if (res?.status == 200) {
        this.categories = res.body;
        console.log(this.categories);
      }
    }
    );
  }
  hideChildModal(): void {
    this.childModal?.hide();
  }
  add_product() {
    this.edit = false
    this.product_form.reset()
    this.imgUrl = ""
    this.childModal?.show();
    this.submit = false
    this.selectedFile = null
    this.product=null
  }
  showPreviewImage(event: any,) {
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = <File>event.target.files[0];
    }
  }
  manage_product() {
    this.submit = true
    this.product_form.patchValue({
      owner_id: localStorage.getItem('id'),
    })
    if (this.product_form.invalid) {
      return
    }
    const fd = new FormData()
    fd.append('title', this.product_form.value.title)
    fd.append('description', this.product_form.value.description)
    fd.append('quantity', this.product_form.value.quantity)
    fd.append('price', this.product_form.value.price)
    fd.append('image', this.selectedFile ? this.selectedFile : this.product.image_name || null)
    fd.append('family_id', this.product_form.value.family_id)
    if (this.edit) {
      fd.append('id', this.product.id)
      this.http.post('edit_product/', fd).subscribe((res: any) => {
        if (res?.status == 200) {
          console.log(res);
          Object.assign(this.product, res.body)
          this.hideChildModal()
        }
      }, (error) => {
        // Handle any errors
      })
    } else {
      this.http.post('add_product', fd).subscribe((res: any) => {
        if (res?.status == 200) {
          this.products.push(res.body)
          this.hideChildModal()
        }
      }, (error) => {
      })
    }

  }
  delete_product() {
    this.http.delete("delete_product?id="+this.product.id).subscribe(res=>{
      console.log(res);
      if(res?.status==200){
        this.products.splice(this.products.indexOf(this.product),1)
        this.hideChildModal()
      }

    })
   }
}
