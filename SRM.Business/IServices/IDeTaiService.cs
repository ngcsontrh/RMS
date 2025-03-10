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
        public Task<bool> AddAsync(DeTaiData model);
        public Task<bool> UpdateAsync(DeTaiData model);
        public Task<DeTaiData?> GetAsync(int id);
        public Task<PageData<DeTaiData>> GetPageAsync(DeTaiSearch searchModel, int pageIndex = 1, int pageSize = 10);
    }
}
