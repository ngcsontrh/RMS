using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class TacGiaData
    {
        public int? Id { get; set; }
        public string? Ten { get; set; }
        public string? MaVienChuc { get; set; }
        public string? GioiTinh { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public int? DonViId { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string? DanToc { get; set; }
        public string? ChucDanh { get; set; }
        public string? ChuyenNganh { get; set; }
        public string? HocVi { get; set; }
        public string? TruongDH { get; set; }
    }
}
