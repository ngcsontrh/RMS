using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;

namespace SRM.Domain.Mappers
{
    public static class DonViChuTriMapper
    {
        public static DonViChuTriData MapToData(this DonViChuTri entity)
        {
            if (entity == null)
            {
                return new DonViChuTriData();
            }
            return new DonViChuTriData
            {
                Id = entity.Id,
                Ten = entity.Ten,
                NgayTao = entity.NgayTao,
                NgaySua = entity.NgaySua
            };
        }

        public static DonViChuTri MapToEntity(this DonViChuTriData data)
        {
            if (data == null)
            {
                return new DonViChuTri();
            }
            return new DonViChuTri
            {
                Id = data.Id ?? Guid.NewGuid(),
                Ten = data.Ten,
                NgayTao = data.NgayTao,
                NgaySua = data.NgaySua
            };
        }
    }
}