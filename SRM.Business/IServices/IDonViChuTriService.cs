using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IDonViChuTriService
    {
        Task<ExecuteData> AddAsync(DonViChuTriData model);
        Task<ExecuteData> UpdateAsync(DonViChuTriData model);
        Task<ExecuteData> GetAsync(int id);
        Task<ExecuteData> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}