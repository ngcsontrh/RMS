using SRM.Domain.Data;
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
        public Task<(bool, DeTaiData?)> GetByIdAsync(Guid id);
        public Task<(bool, PageData<DeTaiData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
