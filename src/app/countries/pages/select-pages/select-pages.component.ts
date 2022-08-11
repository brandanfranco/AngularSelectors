import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectServicesService } from '../../services/select-services.service';
import { Country } from '../../interfaces/countries.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-select-pages',
  templateUrl: './select-pages.component.html',
  styleUrls: ['./select-pages.component.css'],
})
export class SelectPagesComponent implements OnInit {
  regiones: string[] = this.selectService.regiones;
  countries: any = [];
  borders: any = [];

  loading: boolean = false;

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    countries: ['', Validators.required],
    border: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private selectService: SelectServicesService
  ) {}

  ngOnInit() {
    /*     this.myForm.get('region')?.valueChanges.subscribe((region) => {
      console.log(region);

      this.selectService.getCountries(region).subscribe((countries) => {
        this.countries = countries;
      });
    });
   */

    this.regiones = this.selectService.regiones;

    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.myForm.get('countries')?.reset('');
          this.loading = true;
        }),
        switchMap((region: any) => this.selectService.getCountries(region))
      )
      .subscribe((countries) => {
        this.loading = false;
        this.countries = countries;
      });

    this.myForm
      .get('countries')!
      .valueChanges.pipe(
        tap((_) => {
          this.borders = [];
          this.myForm.get('borders')?.reset('');
          this.loading = true;
        }),
        switchMap((cod) => this.selectService.getAlphaCode(cod)),
        switchMap((country) =>
          this.selectService.getCountriesCod(country?.borders!)
        )
      )
      .subscribe((country) => {
        this.borders = country;

        this.loading = false;
      });
  }
  save() {
    console.log(this.myForm.value);
  }
}
