using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Domain.Mappers
{
    public static class DonViMapper
    {
        public static DonViData MapToData(this DonVi donVi)
        {
            if (donVi == null)
            {
                return new DonViData();
            }
            return new DonViData
            {
                Id = donVi.Id,
                Ten = donVi.Ten,
                NgayTao = donVi.NgayTao,
                NgaySua = donVi.NgaySua
            };
        }

        public static DonVi MapToEntity(this DonViData donViData)
        {
            if (donViData == null)
            {
                return new DonVi();
            }
            return new DonVi
            {
                Id = donViData.Id ?? Guid.NewGuid(),
                Ten = donViData.Ten,
                NgayTao = donViData.NgayTao,
                NgaySua = donViData.NgaySua
            };
        }
    }
}
