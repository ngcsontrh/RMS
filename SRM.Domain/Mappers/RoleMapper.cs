using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Domain.Mappers
{
    public static class RoleMapper
    {
        public static RoleData MapToData(this Role role)
        {
            if (role == null)
            {
                return new RoleData();
            }
            return new RoleData
            {
                Id = role.Id,
                Name = role.Name,
                NgayTao = role.NgayTao,
                NgaySua = role.NgaySua,
            };
        }

        public static Role MapToEntity(this RoleData roleData)
        {
            if (roleData == null)
            {
                return new Role();
            }
            return new Role
            {
                Id = roleData.Id ?? Guid.NewGuid(),
                Name = roleData.Name!,
                NgayTao = roleData.NgayTao,
                NgaySua = roleData.NgaySua,                
            };
        }
    }
}
