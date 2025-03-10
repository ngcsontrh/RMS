using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface ITacGiaService
    {
        Task AddAsync(TacGiaData model);
        Task UpdateAsync(TacGiaData model);
        Task DeleteAsync(int id);
        Task<TacGiaData?> GetAsync(int id);
        Task<PageData<TacGiaData>> GetPageAsync(int pageIndex = 1, int pageSize = 10);
        Task<List<TacGiaData>> GetDropDownDataAsync();
    }
}
