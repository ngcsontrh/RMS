using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Json;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class CongBoRepository : RepositoryBase<CongBo>, ICongBoRepository
    {
        public CongBoRepository(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<(List<CongBo>, int)> GetPageWithSearchAsync(CongBoSearch search, int pageIndex, int pageSize)
        {
            var query = GetQueryable();
            query = query.Include(x => x.NoiDangBao)
                .AsNoTracking();
            var result = await GetPageWithFilterAsync(query, pageIndex, pageSize);

            return result;
        }
       
    }
}
