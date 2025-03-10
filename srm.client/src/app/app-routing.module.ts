import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeTaiHomeComponent } from './components/de-tai/home.component';
import { DeTaiEditComponent } from './components/de-tai/edit.component';
import { DanhMucHomeComponent } from './components/danh-muc/home.component';

const routes: Routes = [
  { path: 'toan-truong/de-tai', component: DeTaiHomeComponent },
  { path: 'toan-truong/cong-bo', component: DeTaiHomeComponent },
  { path: 'toan-truong/hoat-dong', component: DeTaiHomeComponent },
  { path: 'ca-nhan/de-tai', component: DeTaiHomeComponent },
  { path: 'de-tai/tao-moi', component: DeTaiEditComponent },
  { path: 'de-tai/:id', component: DeTaiEditComponent },
  { path: 'danh-muc', component: DanhMucHomeComponent },
  { path: '', redirectTo: '/toan-truong/de-tai', pathMatch: 'full' },
  { path: '**', redirectTo: '/toan-truong/de-tai' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
