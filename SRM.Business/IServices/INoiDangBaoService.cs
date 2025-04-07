using SRM.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface INoiDangBaoService
    {
        Task<bool> AddAsync(NoiDangBaoData model);
        Task<bool> UpdateAsync(NoiDangBaoData model);
        Task<bool> DeleteAsync(Guid id);
        Task<(bool, NoiDangBaoData?)> GetByIdAsync(Guid id);
        Task<(bool, List<NoiDangBaoData>?)> GetListAsync();
        Task<(bool, PageData<NoiDangBaoData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);        
    }
}
