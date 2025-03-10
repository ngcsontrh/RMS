using SRM.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class TacGia : EntityBase
    {
        public string Ten { get; set; } = null!;
        public string? MaVienChuc { get; set; }
        public string? GioiTinh { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public int? DonViId { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string? DanToc {  get; set; }
        public string? ChucDanh { get; set; }
        public string? ChuyenNganh { get; set; }
        public string? HocVi { get; set; }
        public string? TruongDH { get; set; }
        
        public virtual DonVi? DonVi { get; set; }
    }
}
