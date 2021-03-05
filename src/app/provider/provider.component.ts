import { Component } from '@angular/core';
import { Country, Category, Provider, ProviderService } from './provider.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  providers: [ProviderService],
  styles: ['.error {color: red;}']
})

export class ProviderComponent {
  error: any;
  countries: Country[];
  selected: Array<Category> = [];
  category_id: number;
  categories: Category[];
  providerForm = this.formBuilder.group({
    name: '',
    description: '',
    licenseId: '',
    address1: '',
    address2: '',
    country: '',
    region: '',
    postcode: '',
    city: '',
    categoryId: ''
  });

  constructor(private providerService: ProviderService, private formBuilder: FormBuilder,
    private http: HttpClient) {
    this.getCategories(0)
    this.getCountries()
  }

  onSubmit() {
    console.warn('Your order has been submitted', this.providerForm.value);
    this.http.post<any>("http://localhost:8080/provider/", this.providerForm.value).subscribe((data) => { });
    //this.providerForm.reset();
  }

  getCountries() {
    this.providerService.getCountries()
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
    this.providerService.getCategories(id)
      .subscribe(
        (data: Category[]) => this.categories = data, // success path
        error => this.error = error // error path
      );
  }

}
