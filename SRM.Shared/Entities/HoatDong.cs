using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    /// <summary>
    /// Hoạt động khoa học
    /// </summary>
    public class HoatDong : EntityBase
    {
        public int? LoaiHoatDongId { get; set; }
        public string Ten { get; set; } = null!;
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
        public string? ChuNhiem { get; set; }
        public string? ThanhVienThamGia { get; set; }
        public string? PhanChiaSuDongGop { get; set; }

        public virtual LoaiHoatDong? LoaiHoatDong { get; set; }
    }
}
