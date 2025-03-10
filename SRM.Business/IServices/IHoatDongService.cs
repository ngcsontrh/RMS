using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IHoatDongService
    {
        Task<bool> AddAsync(HoatDongData model);
        Task<bool> UpdateAsync(HoatDongData model);
        Task<HoatDongData?> GetAsync(int id);
        Task<PageData<HoatDongData>> GetPageAsync(HoatDongSearch searchModel, int pageIndex = 1, int pageSize = 10);
    }
}
