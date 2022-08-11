import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectPagesComponent } from './pages/select-pages/select-pages.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'selector',
        component: SelectPagesComponent,
      },

      { path: '**', redirectTo: 'selector' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingRoutingModule {}
