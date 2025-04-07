using SRM.Domain.Data;
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
        Task<bool> DeleteAsync(Guid id);
        Task<(bool, List<DonViData>?)> GetListAsync();
        Task<(bool, DonViData?)> GetByIdAsync(Guid id);
        Task<(bool, PageData<DonViData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
