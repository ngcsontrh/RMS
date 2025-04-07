using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Domain.Mappers
{
    public static class UserMapper
    {
        public static UserData MapToData(this User user)
        {
            if (user == null)
            {
                return new UserData();
            }
            return new UserData
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                SoDienThoai = user.SoDienThoai,
                HoTen = user.HoTen,
                MaVienChuc = user.MaVienChuc,
                GioiTinh = user.GioiTinh,
                DonViId = user.DonViId,
                TenDonVi = user.DonVi?.Ten,
                NgaySinh = user.NgaySinh,
                DanToc = user.DanToc,
                ChucDanh = user.ChucDanh,
                ChuyenNganh = user.ChuyenNganh,
                HocVi = user.HocVi,
                TruongDH = user.TruongDH,
                NgayTao = user.NgayTao,
                NgaySua = user.NgaySua,
            };
        }

        public static User MapToEntity(this UserData userData)
        {
            if (userData == null)
            {
                return new User();
            }
            return new User
            {
                Id = userData.Id ?? Guid.NewGuid(),
                Username = userData.Username!,
                Email = userData.Email,
                SoDienThoai = userData.SoDienThoai,
                HoTen = userData.HoTen,
                MaVienChuc = userData.MaVienChuc,
                GioiTinh = userData.GioiTinh,
                DonViId = userData.DonViId,
                NgaySinh = userData.NgaySinh,
                DanToc = userData.DanToc,
                ChucDanh = userData.ChucDanh,
                ChuyenNganh = userData.ChuyenNganh,
                HocVi = userData.HocVi,
                TruongDH = userData.TruongDH,
                NgayTao = userData.NgayTao,
                NgaySua = userData.NgaySua, 
            };
        }
    }
}
