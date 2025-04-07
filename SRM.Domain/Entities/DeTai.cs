using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Domain.Entities
{
    [Table("DeTai")]
    public class DeTai : EntityBase
    {
        public Guid? CapDeTaiId { get; set; }
        public string? Ten { get; set; }
        public string? MaSo { get; set; }
        public string? MucTieu { get; set; }
        public string? NoiDung { get; set; }
        public decimal? TongKinhPhi { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public decimal? KinhPhiHangNam { get; set; }
        public string? HoSoNghiemThu { get; set; }
        public string? HoSoSanPham { get; set; }
        public Guid? DonViChuTriId { get; set; }
        public string? ChuNhiem { get; set; }
        public string? CanBoThamGias { get; set; }
        public string? PhanChiaSuDongGop { get; set; }

        public virtual CapDeTai? CapDeTai { get; set; }
        public virtual DonViChuTri DonViChuTri { get; set; } = null!;
    }
}
