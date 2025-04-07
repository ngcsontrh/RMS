using SRM.Domain.Data;
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
        Task<bool> DeleteAsync(Guid id);
        Task<(bool, LoaiHoatDongData?)> GetByIdAsync(Guid id);
        Task<(bool, List<LoaiHoatDongData>?)> GetListAsync();
        Task<(bool, PageData<LoaiHoatDongData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
