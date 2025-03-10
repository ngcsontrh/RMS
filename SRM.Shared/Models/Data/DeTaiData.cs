using SRM.Shared.Models.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class DeTaiData
    {
        public int? Id { get; set; }
        public int? CapDeTaiId { get; set; }
        public string? TenCapDeTai { get; set; }
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
        public int? DonViChuTriId { get; set; }
        public string? TenDonViChuTri { get; set; }
        public TacGiaJson? ChuNhiem { get; set; }
        public List<TacGiaJson>? CanBoThamGias { get; set; }
        public string? PhanChiaSuDongGop { get; set; }
    }
}