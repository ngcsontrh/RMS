using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;

namespace SRM.Domain.Mappers
{
    public static class LoaiHoatDongMapper
    {
        public static LoaiHoatDongData MapToData(this LoaiHoatDong entity)
        {
            if (entity == null)
            {
                return new LoaiHoatDongData();
            }
            return new LoaiHoatDongData
            {
                Id = entity.Id,
                Ten = entity.Ten,
                NgayTao = entity.NgayTao,
                NgaySua = entity.NgaySua
            };
        }

        public static LoaiHoatDong MapToEntity(this LoaiHoatDongData data)
        {
            if (data == null)
            {
                return new LoaiHoatDong();
            }
            return new LoaiHoatDong
            {
                Id = data.Id ?? new Guid(),
                Ten = data.Ten,
                NgayTao = data.NgayTao,
                NgaySua = data.NgaySua
            };
        }
    }
}