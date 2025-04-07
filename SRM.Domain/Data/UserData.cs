using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Domain.Data
{
    public class UserData : ModelBase
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? SoDienThoai { get; set; }
        public string? HoTen { get; set; }
        public string? MaVienChuc { get; set; }
        public string? GioiTinh { get; set; }
        public Guid? DonViId { get; set; }
        public string? TenDonVi { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string? DanToc { get; set; }
        public string? ChucDanh { get; set; }
        public string? ChuyenNganh { get; set; }
        public string? HocVi { get; set; }
        public string? TruongDH { get; set; }
        public string? Role { get; set; }
    }
}
