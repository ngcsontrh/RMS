using SRM.Domain.Data;
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
        Task<(bool, CongBoData?)> GetByIdAsync(Guid id);
        Task<(bool, PageData<CongBoData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}