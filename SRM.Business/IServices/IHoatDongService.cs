using SRM.Domain.Data;
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
        Task<(bool, HoatDongData?)> GetByIdAsync(Guid id);
        Task<(bool, PageData<HoatDongData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
