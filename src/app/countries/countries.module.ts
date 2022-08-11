import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPagesComponent } from './pages/select-pages/select-pages.component';
import { CountriesRoutingRoutingModule } from './countries-routing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectPagesComponent],
  imports: [CommonModule, ReactiveFormsModule, CountriesRoutingRoutingModule],
})
export class CountriesModule {}
