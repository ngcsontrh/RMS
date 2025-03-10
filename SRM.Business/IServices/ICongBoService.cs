using OneOf;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface ICongBoService
    {
        Task<bool> AddAsync(CongBoData model);
        Task<bool> UpdateAsync(CongBoData model);
        Task<CongBoData?> GetAsync(int id);
        Task<PageData<CongBoData>> GetPageAsync(CongBoSearch searchModel, int pageIndex = 1, int pageSize = 10);
    }
}
