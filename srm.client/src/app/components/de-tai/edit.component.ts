import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DeTaiService } from '../../services/de-tai.service';
import { CapDeTaiService } from '../../services/cap-de-tai.service';
import { DonViChuTriService } from '../../services/don-vi-chu-tri.service';
import { TacGiaService } from '../../services/tac-gia.service';
import { DeTaiData, CapDeTaiData, TacGiaJson } from '../../models/data';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("UTC");

@Component({
  selector: 'app-de-tai-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class DeTaiEditComponent implements OnInit {
  deTaiForm: FormGroup;
  isEditMode: boolean = false;
  isDeTaiLoading: boolean = false;
  capDeTaiDatas: CapDeTaiData[] = [];
  donViChuTriDatas: CapDeTaiData[] = [];
  tacGiaJsons: TacGiaJson[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private deTaiService: DeTaiService,
    private capDeTaiService: CapDeTaiService,
    private donViChuTriService: DonViChuTriService,
    private tacGiaService: TacGiaService
  ) {
    this.deTaiForm = this.fb.group({
      ten: ['', [Validators.required]],
      maSo: ['', [Validators.required]],
      mucTieu: ['', [Validators.required]],
      noiDung: ['', [Validators.required]],
      capDeTaiId: [null, [Validators.required]],
      tongKinhPhi: [null, [Validators.required]],
      kinhPhiHangNam: [null],
      ngayBatDau: [null, [Validators.required]],
      ngayKetThuc: [null, [Validators.required]],
      hoSoNghiemThu: [''],
      hoSoSanPham: [''],
      donViChuTriId: [null, [Validators.required]],
      chuNhiem: [null, [Validators.required]],
      canBoThamGias: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadDeTaiData(Number(id));
    }
    this.loadCapDeTaiDatas();
    this.loadDonViChuTriDatas();
    this.loadTacGiaJsons();
  }

  loadDeTaiData(id: number): void {
    this.isDeTaiLoading = true;
    this.deTaiService.getDeTai(id).subscribe({
      next: (data: DeTaiData) => {
        this.deTaiForm.patchValue({
          ...data,
          chuNhiem: data.chuNhiem ? JSON.stringify(data.chuNhiem) : null,
          canBoThamGias: data.canBoThamGias ? data.canBoThamGias.map(item => JSON.stringify(item)) : [],
          ngayBatDau: data.ngayBatDau ? dayjs.utc(data.ngayBatDau).tz("Asia/Ho_Chi_Minh") : null,
          ngayKetThuc: data.ngayKetThuc ? dayjs.utc(data.ngayKetThuc).tz("Asia/Ho_Chi_Minh") : null
        });
        this.isDeTaiLoading = false;
      },
      error: () => {
        this.message.error('Xảy ra lỗi khi tải dữ liệu đề tài!');
        this.isDeTaiLoading = false;
      }
    });
  }

  loadCapDeTaiDatas(): void {
    this.capDeTaiService.getCapDeTais({ pageIndex: 1, pageSize: 1000 }).subscribe({
      next: (data) => {
        this.capDeTaiDatas = data.data;
      },
      error: () => {
        this.message.error('Xảy ra lỗi khi tải dữ liệu cấp đề tài!');
      }
    });
  }

  loadDonViChuTriDatas(): void {
    this.donViChuTriService.getDonViChuTris({ pageIndex: 1, pageSize: 1000 }).subscribe({
      next: (data) => {
        this.donViChuTriDatas = data.data;
      },
      error: () => {
        this.message.error('Xảy ra lỗi khi tải dữ liệu đơn vị chủ trì!');
      }
    });
  }

  loadTacGiaJsons(): void {
    this.tacGiaService.getTacGiaDropDownData().subscribe({
      next: (data) => {
        this.tacGiaJsons = data.map(item => ({
          id: item.id,
          ten: item.ten
        }));
      },
      error: () => {
        this.message.error('Xảy ra lỗi khi tải dữ liệu tác giả!');
      }
    });
  }

  onSubmit(): void {
    if (this.deTaiForm.invalid) {
      for (const i in this.deTaiForm.controls) {
        if (this.deTaiForm.controls.hasOwnProperty(i)) {
          this.deTaiForm.controls[i].markAsDirty();
          this.deTaiForm.controls[i].updateValueAndValidity();
        }
      }
      return;
    }

    const formData: DeTaiData = {
      ...this.deTaiForm.value,
      chuNhiem: this.deTaiForm.value.chuNhiem ? JSON.parse(this.deTaiForm.value.chuNhiem) : null,
      canBoThamGias: this.deTaiForm.value.canBoThamGias ? this.deTaiForm.value.canBoThamGias.map((item: string) => JSON.parse(item)) : [],
      ngayBatDau: this.deTaiForm.value.ngayBatDau ? this.deTaiForm.value.ngayBatDau.toDate() : null,
      ngayKetThuc: this.deTaiForm.value.ngayKetThuc ? this.deTaiForm.value.ngayKetThuc.toDate() : null
    };

    if (this.isEditMode) {
      this.deTaiService.editDeTai(this.route.snapshot.paramMap.get('id')!, formData).subscribe({
        next: () => {
          this.message.success('Cập nhật đề tài thành công!');
          this.router.navigate(['/de-tai']);
        },
        error: () => {
          this.message.error('Xảy ra lỗi khi cập nhật đề tài!');
        }
      });
    } else {
      this.deTaiService.createDeTai(formData).subscribe({
        next: () => {
          this.message.success('Tạo đề tài thành công!');
          this.router.navigate(['/de-tai']);
        },
        error: () => {
          this.message.error('Xảy ra lỗi khi tạo đề tài!');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/de-tai']);
  }
}
