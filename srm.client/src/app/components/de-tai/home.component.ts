import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeTaiService } from '../../services/de-tai.service';
import { DeTaiData, DeTaiSearch } from '../../models/data';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-de-tai-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class DeTaiHomeComponent implements OnInit {
  dataSource: DeTaiData[] = [];
  isLoading = false;
  searchParams: DeTaiSearch = {
    pageIndex: 1,
    pageSize: 10,
    ten: null,
  };
  totalItems = 0;

  constructor(
    private deTaiService: DeTaiService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.deTaiService.getDeTais(this.searchParams).subscribe(
      (response) => {
        this.dataSource = response.data;
        this.totalItems = response.total;
        this.isLoading = false;
      },
      (error) => {
        this.message.error('Có lỗi xảy ra');
        this.isLoading = false;
      }
    );
  }

  handlePaginationChange(pageIndex: number, pageSize: number): void {
    this.searchParams.pageIndex = pageIndex;
    this.searchParams.pageSize = pageSize;
    this.fetchData();
  }
}
