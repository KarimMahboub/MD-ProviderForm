import { Component } from '@angular/core';
import { Country, Category, Accesspoint, AccesspointService } from './accesspoint.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-provider',
  templateUrl: './accesspoint.component.html',
  providers: [AccesspointService],
  styles: ['.error {color: red;}']
})

export class AccesspointComponent {
  error: any;
  countries: Country[];
  selected: Array<Category> = [];
  category_id: number;
  categories: Category[];
  accesspointForm = this.formBuilder.group({
    name: '',
    description: '',
    address1: '',
    address2: '',
    country: '',
    region: '',
    postcode: '',
    city: '',
    categoryId: ''
  });

  constructor(private accesspointService: AccesspointService, private formBuilder: FormBuilder,
    private http: HttpClient) {
    this.getCategories(0)
    this.getCountries()
  }

  onSubmit() {
    console.warn('Your order has been submitted', this.accesspointForm.value);
    this.http.post<any>("http://localhost:8080/point/", this.accesspointForm.value).subscribe((data) => { });
  }

  getCountries() {
    this.accesspointService.getCountries()
      .subscribe(
        (data: Country[]) => this.countries = data, // success path
        error => this.error = error // error path
      );
  }

  selectCategory(id: number) {
    let cat = this.categories.find(c => c.id == id)
    console.log(cat);
    this.category_id = id;
    this.selected.push(cat)
    this.getCategories(cat.id)
  }

  getCategories(id: number) {
    this.accesspointService.getCategories(id)
      .subscribe(
        (data: Category[]) => this.categories = data, // success path
        error => this.error = error // error path
      );
  }

}
