using SRM.Shared.Entities;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface ILoaiHoatDongRepository : IRepositoryBase<LoaiHoatDong>
    {
        Task<LoaiHoatDong?> GetByTenAsync(string ten);
        Task<(List<LoaiHoatDong>, int)> GetPageWithSearchAsync(LoaiHoatDongSearch search);

    }
}
