using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface ILoaiHoatDongService
    {
        Task<bool> AddAsync(LoaiHoatDongData model);
        Task<bool> UpdateAsync(LoaiHoatDongData model);
        Task<bool> DeleteAsync(int id);
        Task<LoaiHoatDongData?> GetAsync(int id);
        Task<PageData<LoaiHoatDongData>> GetPageAsync(LoaiHoatDongSearch searchModel,int pageIndex = 1, int pageSize = 10);
    }
}
