import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() current: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 0;
  @Output() pageChange: EventEmitter<{ pageIndex: number, pageSize: number }> = new EventEmitter();

  onChange(pageIndex: number, pageSize: number): void {
    this.pageChange.emit({ pageIndex, pageSize });
  }
}
