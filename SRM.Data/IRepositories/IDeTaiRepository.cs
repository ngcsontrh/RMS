using SRM.Shared.Entities;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface IDeTaiRepository : IRepositoryBase<DeTai>
    {
        Task<(List<DeTai>, int)> GetPageWithSearchAsync(DeTaiSearch search);
    }
}
