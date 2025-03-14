using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface ICongBoRepository : IRepositoryBase<CongBo>
    {
        Task<(List<CongBo>, int)> GetPageWithSearchAsync(CongBoSearch search, int pageIndex, int pageSize);
       
    }
}
