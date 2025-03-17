using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IDeTaiService
    {
        public Task<ExecuteData> AddAsync(DeTaiData model);
        public Task<ExecuteData> UpdateAsync(DeTaiData model);
        public Task<ExecuteData> GetAsync(int id);
        public Task<ExecuteData> GetPageAsync(DeTaiSearch searchModel, int pageIndex = 1, int pageSize = 10);
    }
}
