using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class LyLichKhoaHocData
    {
        public int? Id { get; set; }
        public int? UserId { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string? NoiSinh { get; set; }
        public string? QueQuan { get; set; }
        public string? DanToc { get; set; }
        public string? HocViCaoNhat { get; set; }
        public string? NoiCongNhanHocVi { get; set; }
        public string? ChucDanhKhoaHoc { get; set; }
        public string? NamNhanHocVi { get; set; }
        public string? ChucVuHienTai { get; set; }
        public string? DiaChi { get; set; }
        public string? DienThoaiCoQuan { get; set; }
        public string? NganhDaiHoc { get; set; }
        public string? NoiDaoTaoDaiHoc { get; set; }
        public string? HeDaoTaoDaiHoc { get; set; }
        public int? NamTotNghiepDaiHoc { get; set; }
        public string? ChuyenNganhThacSi { get; set; }
        public string? NoiDaoTaoThacSi { get; set; }
        public int? NamCapBangThacSi { get; set; }
        public string? ChuyenNganhTienSi { get; set; }
        public string? NoiDaoTaoTienSi { get; set; }
        public int? NamCapBangTienSi { get; set; }
        public string? ChuyenNganhDaoDao { get; set; }
        public string? NgoaiNgu1 { get; set; }
        public string? MucDoNgoaiNgu1 { get; set; }
        public string? NgoaiNgu2 { get; set; }
        public string? MucDoNgoaiNgu2 { get; set; }
        public string? ChucDanhNghienCuu { get; set; }
    }
}
