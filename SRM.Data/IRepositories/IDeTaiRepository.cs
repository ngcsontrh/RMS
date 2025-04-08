using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface IDeTaiRepository : IRepositoryBase<DeTai>
    {
        Task<DeTai?> GetDetailAsync(Guid id);
        Task<(List<DeTai>, int)> GetPageDetailAsync(int pageIndex, int pageSize);
    }
}
