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
        Task AddAsync(DonViChuTriData model);
        Task UpdateAsync(DonViChuTriData model);
        Task<DonViChuTriData?> GetAsync(int id);
        Task<PageData<DonViChuTriData>> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}