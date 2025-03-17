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
        Task<ExecuteData> AddAsync(CongBoData model);
        Task<ExecuteData> UpdateAsync(CongBoData model);
        Task<ExecuteData> GetAsync(int id);
        Task<ExecuteData> GetPageAsync(CongBoSearch searchModel, int pageIndex = 1, int pageSize = 10);
    }
}
