using AutoMapper;
using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SRM.Shared.Utils
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            var currentAssembly = Assembly.GetAssembly(typeof(AutoMapperProfile));
            var options = new JsonSerializerOptions();
            var entityTypes = currentAssembly!.ExportedTypes
                .Where(t => t.Namespace!.Equals("SRM.Shared.Entities"))
                .ToList();

            foreach (var entityType in entityTypes)
            {
                CreateMap(entityType, entityType);
                var dataType = currentAssembly.ExportedTypes.FirstOrDefault(x => x.Name.Equals(entityType.Name + "Data"));
                if (dataType != null)
                {
                    CreateMap(entityType, dataType).ReverseMap();
                }
            }

            CreateMap<CongBo, CongBoData>()
                .ForMember(dest => dest.TenNoiDangBao, opt => opt.MapFrom(src => src.NoiDangBao != null ? src.NoiDangBao.Ten : null))
                .ForMember(dest => dest.TenThanhQua, opt => opt.MapFrom(src => src.ThanhQua != null ? src.ThanhQua.Ten : null))
                .ForMember(dest => dest.TacGiaChinh, opt => opt.MapFrom(src => src.TacGiaChinh != null ? JsonSerializer.Deserialize<string>(src.TacGiaChinh, options) : null))
                .ForMember(dest => dest.TacGiaLienHe, opt => opt.MapFrom(src => src.TacGiaLienHe != null ? JsonSerializer.Deserialize<string>(src.TacGiaLienHe, options) : null))
                .ForMember(dest => dest.DongTacGias, opt => opt.MapFrom(src => src.DongTacGias != null ? JsonSerializer.Deserialize<List<string>>(src.DongTacGias, options) : null))
                .ReverseMap()
                .ForMember(dest => dest.TacGiaChinh, opt => opt.MapFrom(src => src.TacGiaChinh != null ? JsonSerializer.Serialize(src.TacGiaChinh, options) : null))
                .ForMember(dest => dest.TacGiaLienHe, opt => opt.MapFrom(src => src.TacGiaLienHe != null ? JsonSerializer.Serialize(src.TacGiaLienHe, options) : null))
                .ForMember(dest => dest.DongTacGias, opt => opt.MapFrom(src => src.DongTacGias != null ? JsonSerializer.Serialize(src.DongTacGias, options) : null));

            CreateMap<DeTai, DeTaiData>()
                .ForMember(dest => dest.TenCapDeTai, opt => opt.MapFrom(src => src.CapDeTai != null ? src.CapDeTai.Ten : null))
                .ForMember(dest => dest.TenDonViChuTri, opt => opt.MapFrom(src => src.DonViChuTri != null ? src.DonViChuTri.Ten : null))
                .ForMember(dest => dest.CanBoThamGias, opt => opt.MapFrom(src => src.CanBoThamGias != null ? JsonSerializer.Deserialize<List<string>>(src.CanBoThamGias, options) : null))
                .ReverseMap()
                .ForMember(dest => dest.ChuNhiem, opt => opt.MapFrom(src => src.ChuNhiem != null ? JsonSerializer.Serialize(src.ChuNhiem, options) : null))
                .ForMember(dest => dest.CanBoThamGias, opt => opt.MapFrom(src => src.CanBoThamGias != null ? JsonSerializer.Serialize(src.CanBoThamGias, options) : null));

            CreateMap<HoatDong, HoatDongData>()
                .ForMember(dest => dest.TenLoaiHoatDong, opt => opt.MapFrom(src => src.LoaiHoatDong != null ? src.LoaiHoatDong.Ten : null))
                .ForMember(dest => dest.ChuNhiem, opt => opt.MapFrom(src => src.ChuNhiem != null ? JsonSerializer.Deserialize<string>(src.ChuNhiem, options) : null))
                .ForMember(dest => dest.ThanhVienThamGias, opt => opt.MapFrom(src => src.ThanhVienThamGias != null ? JsonSerializer.Deserialize<List<string>>(src.ThanhVienThamGias, options) : null))
                .ReverseMap()
                .ForMember(dest => dest.ChuNhiem, opt => opt.MapFrom(src => src.ChuNhiem != null ? JsonSerializer.Serialize(src.ChuNhiem, options) : null))
                .ForMember(dest => dest.ThanhVienThamGias, opt => opt.MapFrom(src => src.ThanhVienThamGias != null ? JsonSerializer.Serialize(src.ThanhVienThamGias, options) : null));
        }
    }
}
