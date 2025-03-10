using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface ICapDeTaiService
    {
        Task<bool> AddAsync(CapDeTaiData model);
        Task<bool> UpdateAsync(CapDeTaiData model);
        Task<bool> DeleteAsync(int id);
        Task<CapDeTaiData?> GetAsync(int id);
        Task<PageData<CapDeTaiData>> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
