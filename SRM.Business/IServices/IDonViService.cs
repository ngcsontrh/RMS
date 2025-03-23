using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IDonViService
    {
        Task<ExecuteData> AddAsync(DonViData model);
        Task<ExecuteData> UpdateAsync(DonViData model);
        Task<ExecuteData> DeleteAsync(int id);
        Task<ExecuteData> GetAsync(int id);
        Task<ExecuteData> GetPageAsync(int pageIndex = 1, int pageSize = 10);
        Task<ExecuteData> GetDropdownAsync();
    }
}
