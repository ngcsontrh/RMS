using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;

namespace SRM.Domain.Mappers
{
    public static class NoiDangBaoMapper
    {
        public static NoiDangBaoData MapToData(this NoiDangBao entity)
        {
            if (entity == null)
            {
                return new NoiDangBaoData();
            }
            return new NoiDangBaoData
            {
                Id = entity.Id,
                Ten = entity.Ten,                
                NgayTao = entity.NgayTao,
                NgaySua = entity.NgaySua
            };
        }

        public static NoiDangBao MapToEntity(this NoiDangBaoData data)
        {
            if (data == null)
            {
                return new NoiDangBao();
            }
            return new NoiDangBao
            {
                Id = data.Id ?? Guid.NewGuid(),
                Ten = data.Ten,
                NgayTao = data.NgayTao,
                NgaySua = data.NgaySua
            };
        }
    }
}