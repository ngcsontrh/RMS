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
        Task<bool> AddAsync(DonViData model);
        Task<bool> UpdateAsync(DonViData model);
        Task<bool> DeleteAsync(int id);
        Task<DonViData?> GetAsync(int id);
        Task<PageData<DonViData>> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
