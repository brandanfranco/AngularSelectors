import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CountryCod, Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectServicesService {
  baseUrl = 'https://restcountries.com/v2/region';
  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  getCountries(country: string) {
    return this.http.get(`${this.baseUrl}/${country}?fields=name,alpha3Code`);
  }

  getAlphaCode(codigo: string): Observable<CountryCod | null> {
    if (!codigo) {
      return of(null);
    }
    const Url = `https://restcountries.com/v2/alpha/${codigo}`;

    return this.http.get<CountryCod>(Url);
  }

  getAlphaCountry(codigo: string): Observable<Country> {
    const Url = `https://restcountries.com/v2/alpha/${codigo}?fields=name,alpha3Code`;

    return this.http.get<Country>(Url);
  }

  getCountriesCod(borders: string[]): Observable<Country[]> {
    if (!borders) {
      return of([]);
    }

    const peticiones: Observable<Country>[] = [];

    borders.forEach((cod) => {
      const peticion = this.getAlphaCountry(cod);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
