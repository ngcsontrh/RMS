using SRM.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IDonViChuTriService
    {
        Task<bool> AddAsync(DonViChuTriData model);
        Task<bool> UpdateAsync(DonViChuTriData model);
        Task<bool> DeleteAsync(Guid id);
        Task<(bool, List<DonViChuTriData>?)> GetListAsync();
        Task<(bool, DonViChuTriData?)> GetByIdAsync(Guid id);
        Task<(bool, PageData<DonViChuTriData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}