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
        Task<bool> AddAsync(NoiDangBaoData model);
        Task<bool> UpdateAsync(NoiDangBaoData model);
        Task<bool> DeleteAsync(int id);
        Task<NoiDangBaoData?> GetAsync(int id);
        Task<PageData<NoiDangBaoData>> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
