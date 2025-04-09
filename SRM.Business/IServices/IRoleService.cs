using SRM.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IRoleService
    {
        Task<bool> AddAsync(RoleData model);
        Task<bool> UpdateAsync(RoleData model);
        Task<bool> DeleteAsync(Guid id);
        Task<(bool, List<RoleData>?)> GetListAsync();
        Task<(bool, RoleData?)> GetByIdAsync(Guid id);
        Task<(bool, PageData<RoleData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
