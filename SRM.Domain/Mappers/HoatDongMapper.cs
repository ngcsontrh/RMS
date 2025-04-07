using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;

namespace SRM.Domain.Mappers
{
    public static class HoatDongMapper
    {
        public static HoatDongData MapToData(this HoatDong entity)
        {
            if (entity == null)
            {
                return new HoatDongData();
            }
            return new HoatDongData
            {
                Id = entity.Id,
                Ten = entity.Ten,
                NoiDung = entity.NoiDung,
                GhiChu = entity.GhiChu,
                DiaChi = entity.DiaChi,
                KinhPhi = entity.KinhPhi,
                SoTrang = entity.SoTrang,
                SoTiet = entity.SoTiet,
                FileDinhKem = entity.FileDinhKem,
                NgayBatDau = entity.NgayBatDau,
                NgayKetThuc = entity.NgayKetThuc,
                DuongDan = entity.DuongDan,
                ChuNhiem = entity.ChuNhiem,
                ThanhVienThamGias = entity.ThanhVienThamGias,
                PhanChiaSuDongGop = entity.PhanChiaSuDongGop,
                NgayTao = entity.NgayTao,
                NgaySua = entity.NgaySua,
                LoaiHoatDongId = entity.LoaiHoatDongId,
                TenLoaiHoatDong = entity.LoaiHoatDong?.Ten,
            };
        }

        public static HoatDong MapToEntity(this HoatDongData data)
        {
            if (data == null)
            {
                return new HoatDong();
            }
            return new HoatDong
            {
                Id = data.Id ?? Guid.NewGuid(),
                Ten = data.Ten,
                NoiDung = data.NoiDung,
                GhiChu = data.GhiChu,
                DiaChi = data.DiaChi,
                KinhPhi = data.KinhPhi,
                SoTrang = data.SoTrang,
                SoTiet = data.SoTiet,
                FileDinhKem = data.FileDinhKem,
                NgayBatDau = data.NgayBatDau,
                NgayKetThuc = data.NgayKetThuc,
                DuongDan = data.DuongDan,
                ChuNhiem = data.ChuNhiem,
                ThanhVienThamGias = data.ThanhVienThamGias,
                PhanChiaSuDongGop = data.PhanChiaSuDongGop,
                NgayTao = data.NgayTao,
                NgaySua = data.NgaySua,
                LoaiHoatDongId = data.LoaiHoatDongId,
            };
        }
    }
}