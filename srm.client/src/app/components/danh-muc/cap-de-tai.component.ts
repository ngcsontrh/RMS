import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CapDeTaiService } from '../../services/cap-de-tai.service';

@Component({
  selector: 'app-cap-de-tai',
  templateUrl: './cap-de-tai.component.html',
  styleUrls: ['./cap-de-tai.component.css']
})
export class CapDeTaiComponent implements OnInit {
  form: FormGroup;
  dataSource: any[] = [];
  isLoading = false;
  isEditing = false;
  editData: any = null;
  searchParams = {
    pageIndex: 1,
    pageSize: 10
  };
  totalItems = 0;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private capDeTaiService: CapDeTaiService
  ) {
    this.form = this.fb.group({
      ten: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.capDeTaiService.getCapDeTais(this.searchParams).subscribe(
      (response: any) => {
        this.dataSource = response.data;
        this.totalItems = response.total;
        this.isLoading = false;
      },
      (error: any) => {
        this.message.error('Có lỗi xảy ra');
        this.isLoading = false;
      }
    );
  }

  handlePaginationChange(pageIndex: number, pageSize: number): void {
    this.searchParams.pageIndex = pageIndex;
    this.searchParams.pageSize = pageSize;
    this.loadData();
  }

  handleRowClick(data: any): void {
    this.editData = data;
    this.form.setValue({ ten: data.ten });
  }

  handleCreateNew(): void {
    this.form.reset();
    this.editData = null;
    this.isEditing = true;
  }

  handleEdit(): void {
    if (!this.editData) {
      this.message.warning('Vui lòng chọn một dòng để chỉnh sửa!');
      return;
    }
    this.isEditing = true;
  }

  handleCancelEdit(): void {
    if (this.editData) {
      this.form.setValue({ ten: this.editData.ten });
    } else {
      this.form.reset();
    }
    this.isEditing = false;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    if (this.editData) {
      this.capDeTaiService.editCapDeTai(this.editData.id, formData).subscribe(
        () => {
          this.message.success('Cập nhật thành công');
          this.loadData();
          this.isEditing = false;
        },
        (error: any) => {
          this.message.error('Có lỗi xảy ra');
        }
      );
    } else {
      this.capDeTaiService.createCapDeTai(formData).subscribe(
        () => {
          this.message.success('Tạo mới thành công');
          this.loadData();
          this.isEditing = false;
        },
        (error: any) => {
          this.message.error('Có lỗi xảy ra');
        }
      );
    }
  }
}
