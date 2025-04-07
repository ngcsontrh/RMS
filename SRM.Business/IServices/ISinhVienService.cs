using SRM.Domain.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface ISinhVienService
    {
        Task<bool> AddAsync(SinhVienData model);
        Task<bool> UpdateAsync(SinhVienData model);
        Task<bool> DeleteAsync(Guid id);
        Task<(bool, List<SinhVienData>?)> GetListAsync();
        Task<(bool, SinhVienData?)> GetAsync(Guid id);
        Task<(bool, PageData<SinhVienData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
