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
                .ForMember(dest => dest.DongTacGias, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.DongTacGias) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(src.DongTacGias, options)))
                .ReverseMap()
                .ForMember(dest => dest.DongTacGias, opt => opt.MapFrom(src => JsonSerializer.Serialize(src.DongTacGias, options)));

            CreateMap<DeTai, DeTaiData>()
                .ForMember(dest => dest.TenCapDeTai, opt => opt.MapFrom(src => src.CapDeTai != null ? src.CapDeTai.Ten : null))
                .ForMember(dest => dest.TenDonViChuTri, opt => opt.MapFrom(src => src.DonViChuTri != null ? src.DonViChuTri.Ten : null))
                .ForMember(dest => dest.CanBoThamGias, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.CanBoThamGias) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(src.CanBoThamGias, options)))
                .ReverseMap()
                .ForMember(dest => dest.CanBoThamGias, opt => opt.MapFrom(src => JsonSerializer.Serialize(src.CanBoThamGias, options)));

            CreateMap<RegisterData, User>();

            CreateMap<LoginData, User>();
        }
    }
}
