import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/commons/error.component';
import { LoadingComponent } from './components/commons/loading.component';
import { PaginationComponent } from './components/commons/pagination.component';
import { CapDeTaiComponent } from './components/danh-muc/cap-de-tai.component';
import { DanhMucHomeComponent } from './components/danh-muc/home.component';
import { DeTaiEditComponent } from './components/de-tai/edit.component';
import { DeTaiHomeComponent } from './components/de-tai/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoadingComponent,
    PaginationComponent,
    CapDeTaiComponent,
    DanhMucHomeComponent,
    DeTaiEditComponent,
    DeTaiHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzMessageModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzPaginationModule,
    NzSkeletonModule,
    NzResultModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
