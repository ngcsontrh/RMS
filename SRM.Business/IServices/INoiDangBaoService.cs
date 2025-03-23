using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface INoiDangBaoService
    {
        Task<ExecuteData> AddAsync(NoiDangBaoData model);
        Task<ExecuteData> UpdateAsync(NoiDangBaoData model);
        Task<ExecuteData> DeleteAsync(int id);
        Task<ExecuteData> GetAsync(int id);
        Task<ExecuteData> GetPageAsync(int pageIndex = 1, int pageSize = 10);
        Task<ExecuteData> GetDropdownAsync();
    }
}
