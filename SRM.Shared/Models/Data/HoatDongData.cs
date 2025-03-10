using SRM.Shared.Models.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class HoatDongData
    {
        public int? Id { get; set; }
        public int? LoaiHoatDongId { get; set; }
        public string? TenLoaiHoatDong { get; set; }
        public string? Ten { get; set; }
        public string? NoiDung { get; set; }
        public string? GhiChu { get; set; }
        public string? DiaChi { get; set; }
        public decimal? KinhPhi { get; set; }
        public int? SoTrang { get; set; }
        public int? SoTiet { get; set; }
        public string? FileDinhKem { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public string? DuongDan { get; set; }
        public TacGiaJson? ChuNhiem { get; set; }
        public List<TacGiaJson>? ThanhVienThamGias { get; set; }
        public string? PhanChiaSuDongGop { get; set; }
    }
}
