using SRM.Domain.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IGiangVienService
    {
        Task<bool> AddAsync(GiangVienData model);
        Task<bool> UpdateAsync(GiangVienData model);
        Task<bool> DeleteAsync(Guid id);
        Task<(bool, List<GiangVienData>?)> GetListAsync();
        Task<(bool, GiangVienData?)> GetAsync(Guid id);
        Task<(bool, PageData<GiangVienData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
