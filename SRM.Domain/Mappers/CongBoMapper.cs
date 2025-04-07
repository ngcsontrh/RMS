using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Domain.Mappers
{
    public static class CongBoMapper
    {
        public static CongBo MapToEntity(this CongBoData data)
        {
            if (data == null)
            {
                return new CongBo();
            }
            return new CongBo
            {
                Id = data.Id ?? Guid.NewGuid(),
                NoiDangBaoId = data.NoiDangBaoId,
                LinkMinhChungTapChi = data.LinkMinhChungTapChi,
                Ten = data.Ten,
                DiaDiem = data.DiaDiem,
                TenTapChi = data.TenTapChi,
                NhaXuatBan = data.NhaXuatBan,
                FileMinhChungBaiBao = data.FileMinhChungBaiBao,
                LinkBaiBao = data.LinkBaiBao,
                NgayGuiDang = data.NgayGuiDang,
                NgayCongBo = data.NgayCongBo,
                ChiSoTacDong = data.ChiSoTacDong,
                Ky = data.Ky,
                Tap = data.Tap,
                Trang = data.Trang,
                DiemHoiDong = data.DiemHoiDong,
                TenHoiDong = data.TenHoiDong,
                LoaiQ = data.LoaiQ,
                ThanhQuaId = data.ThanhQuaId,
                LinkMinhChungLoaiQ = data.LinkMinhChungLoaiQ,
                TacGiaChinh = data.TacGiaChinh,
                TacGiaLienHe = data.TacGiaLienHe,
                DongTacGias = data.DongTacGias,
                LoaiHoTroChiPhi = data.LoaiHoTroChiPhi,
                PhanChiaSuDongGop = data.PhanChiaSuDongGop,
                NgayTao = data.NgayTao,
                NgaySua = data.NgaySua,                
            };
        }

        public static CongBoData MapToData(this CongBo entity)
        {
            if (entity == null)
            {
                return new CongBoData();
            }
            return new CongBoData
            {
                Id = entity.Id,
                NoiDangBaoId = entity.NoiDangBaoId,
                LinkMinhChungTapChi = entity.LinkMinhChungTapChi,
                Ten = entity.Ten,
                DiaDiem = entity.DiaDiem,
                TenTapChi = entity.TenTapChi,
                NhaXuatBan = entity.NhaXuatBan,
                FileMinhChungBaiBao = entity.FileMinhChungBaiBao,
                LinkBaiBao = entity.LinkBaiBao,
                NgayGuiDang = entity.NgayGuiDang,
                NgayCongBo = entity.NgayCongBo,
                ChiSoTacDong = entity.ChiSoTacDong,
                Ky = entity.Ky,
                Tap = entity.Tap,
                Trang = entity.Trang,
                DiemHoiDong = entity.DiemHoiDong,
                TenHoiDong = entity.TenHoiDong,
                LoaiQ = entity.LoaiQ,
                ThanhQuaId = entity.ThanhQuaId,
                LinkMinhChungLoaiQ = entity.LinkMinhChungLoaiQ,
                TacGiaChinh = entity.TacGiaChinh,
                TacGiaLienHe = entity.TacGiaLienHe,
                DongTacGias = entity.DongTacGias,
                LoaiHoTroChiPhi = entity.LoaiHoTroChiPhi,
                PhanChiaSuDongGop = entity.PhanChiaSuDongGop,
                NgayTao = entity.NgayTao,
                NgaySua = entity.NgaySua,
                TenNoiDangBao = entity.NoiDangBao?.Ten,
            };
        }
    }
}
