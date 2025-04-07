using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Domain.Mappers
{
    public static class DeTaiMapper
    {
        public static DeTaiData MapToData(this DeTai entity)
        {
            if (entity == null)
            {
                return new DeTaiData();
            }
            return new DeTaiData
            {
                Id = entity.Id,
                CanBoThamGias = entity.CanBoThamGias?.Split(", ").ToList(),
                CapDeTaiId = entity.CapDeTaiId,
                ChuNhiem = entity.ChuNhiem,
                DonViChuTriId = entity.DonViChuTriId,
                HoSoNghiemThu = entity.HoSoNghiemThu,
                HoSoSanPham = entity.HoSoSanPham,
                KinhPhiHangNam = entity.KinhPhiHangNam,
                MaSo = entity.MaSo,
                MucTieu = entity.MucTieu,
                NoiDung = entity.NoiDung,
                NgayBatDau = entity.NgayBatDau,
                NgayKetThuc = entity.NgayKetThuc,
                NgaySua = entity.NgaySua,
                NgayTao = entity.NgayTao,
                PhanChiaSuDongGop = entity.PhanChiaSuDongGop,
                Ten = entity.Ten,
                TenCapDeTai = entity.CapDeTai?.Ten,
                TenDonViChuTri = entity.DonViChuTri?.Ten,
                TongKinhPhi = entity.TongKinhPhi,
            };
        }

        public static DeTai MapTodata(this DeTaiData data)
        {
            if (data == null)
            {
                return new DeTai();
            }
            return new DeTai
            {
                Id = data.Id ?? Guid.NewGuid(),
                CanBoThamGias = data.CanBoThamGias != null ? string.Join(", ", data.CanBoThamGias) : null,
                CapDeTaiId = data.CapDeTaiId,
                ChuNhiem = data.ChuNhiem,
                DonViChuTriId = data.DonViChuTriId,
                HoSoNghiemThu = data.HoSoNghiemThu,
                HoSoSanPham = data.HoSoSanPham,
                KinhPhiHangNam = data.KinhPhiHangNam,
                MaSo = data.MaSo,
                MucTieu = data.MucTieu,
                NoiDung = data.NoiDung,
                NgayBatDau = data.NgayBatDau,
                NgayKetThuc = data.NgayKetThuc,
                NgaySua = data.NgaySua,
                NgayTao = data.NgayTao,
                PhanChiaSuDongGop = data.PhanChiaSuDongGop,
                Ten = data.Ten,
                TongKinhPhi = data.TongKinhPhi,                
            };
        }
    }
}
