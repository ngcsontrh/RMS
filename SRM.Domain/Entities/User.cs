using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SRM.Domain.Entities
{
    [Table("User")]
    public class User : EntityBase
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Email { get; set; }
        public string? SoDienThoai { get; set; }
        public string? HoTen { get; set; }
        public string? MaVienChuc { get; set; }
        public string? GioiTinh { get; set; }
        public Guid? DonViId { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string? DanToc { get; set; }
        public string? ChucDanh { get; set; }
        public string? ChuyenNganh { get; set; }
        public string? HocVi { get; set; }
        public string? TruongDH { get; set; }

        public virtual DonVi? DonVi { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }

}