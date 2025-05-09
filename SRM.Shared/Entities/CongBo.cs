﻿using SRM.Shared.Models.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class CongBo : EntityBase
    {
        public int? NoiDangBaoId { get; set; }
        public string? LinkMinhChungTapChi { get; set; }
        public string Ten { get; set; } = null!;
        public string? DiaDiem { get; set; }
        public string? TenTapChi { get; set; }
        public string? NhaXuatBan { get; set; }
        public string? FileMinhChungBaiBao { get; set; }
        public string? LinkBaiBao { get; set; }
        public DateTime? NgayGuiDang { get; set; }
        public DateTime? NgayCongBo { get; set; }
        public decimal? ChiSoTacDong { get; set; }
        public int? Ky {  get; set; }
        public int? Tap {  get; set; }
        public string? Trang { get; set; }
        public decimal? DiemHoiDong { get; set; }
        public string? TenHoiDong { get; set; }
        public string? LoaiQ { get; set; }
        public int? ThanhQuaId { get; set; }
        public string? LinkMinhChungLoaiQ { get; set; }
        public string? TacGiaChinh { get; set; }
        public string? TacGiaLienHe { get; set; }
        public string? DongTacGias { get; set; }
        public string? LoaiHoTroChiPhi { get; set; }
        public string? PhanChiaSuDongGop { get; set; }

        public virtual NoiDangBao? NoiDangBao { get; set; }
        public virtual ThanhQua? ThanhQua { get; set; }
    }
}
