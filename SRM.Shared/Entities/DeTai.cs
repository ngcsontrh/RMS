using SRM.Shared.Models.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class DeTai : EntityBase
    {
        public int? CapDeTaiId { get; set; }
        public string Ten { get; set; } = null!;
        public string MaSo { get; set; } = null!;
        public string? MucTieu { get; set; }
        public string? NoiDung { get; set; }
        public decimal? TongKinhPhi { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public decimal? KinhPhiHangNam { get; set; }
        public string? HoSoNghiemThu { get; set; }
        public string? HoSoSanPham { get; set; }
        public int? DonViChuTriId { get; set; }
        public string? ChuNhiem { get; set; }
        public string? CanBoThamGias { get; set; }
        public string? PhanChiaSuDongGop { get; set; }

        public virtual CapDeTai? CapDeTai { get; set; }
        public virtual DonViChuTri DonViChuTri { get; set; } = null!;
    }
}
