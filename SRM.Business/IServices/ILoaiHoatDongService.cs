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
        Task<ExecuteData> AddAsync(LoaiHoatDongData model);
        Task<ExecuteData> UpdateAsync(LoaiHoatDongData model);
        Task<ExecuteData> DeleteAsync(int id);
        Task<ExecuteData> GetAsync(int id);
        Task<ExecuteData> GetPageAsync(LoaiHoatDongSearch searchModel,int pageIndex = 1, int pageSize = 10);
    }
}
