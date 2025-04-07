using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;

namespace SRM.Domain.Mappers
{
    public static class ThanhQuaMapper
    {
        public static ThanhQuaData MapToData(this ThanhQua entity)
        {
            if (entity == null)
            {
                return new ThanhQuaData();
            }
            return new ThanhQuaData
            {
                Id = entity.Id,
                Ten = entity.Ten,
                NgayTao = entity.NgayTao,
                NgaySua = entity.NgaySua
            };
        }

        public static ThanhQua MapToEntity(this ThanhQuaData data)
        {
            if (data == null)
            {
                return new ThanhQua();
            }
            return new ThanhQua
            {
                Id = data.Id ?? Guid.NewGuid(),
                Ten = data.Ten,
                NgayTao = data.NgayTao,
                NgaySua = data.NgaySua
            };
        }
    }
}