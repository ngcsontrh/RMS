using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Domain.Mappers
{
    public static class CapDeTaiMapper
    {
        public static CapDeTai MapToEntity(this CapDeTaiData data)
        {
            if (data == null)
            {
                return new CapDeTai();
            }
            return new CapDeTai
            {
                Id = data.Id ?? Guid.NewGuid(),
                Ten = data.Ten,
                NgaySua = data.NgaySua,
                NgayTao = data.NgayTao,
            };
        }

        public static CapDeTaiData MapToData(this CapDeTai entity)
        {
            if (entity == null)
            {
                return new CapDeTaiData();
            }
            return new CapDeTaiData
            {
                Id = entity.Id,
                Ten = entity.Ten,
                NgaySua = entity.NgaySua,
                NgayTao = entity.NgayTao,
            };
        }
    }
}
