using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface ICongBoRepository : IRepositoryBase<CongBo>
    {
        Task<CongBo?> GetDetailAsync(Guid id);
        Task<(List<CongBo>, int)> GetPageDetailAsync(int pageIndex, int pageSize);
    }
}
