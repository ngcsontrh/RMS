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
        public CongBoRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<(List<CongBo>, int)> GetPageWithSearchAsync(CongBoSearch search, int pageIndex, int pageSize)
        {
            var query = GetQueryable();
            if (search.UserId.HasValue)
            {
                query = query.Where(x => x.TacGiaChinh == search.UserId.Value.ToString() ||
                                        x.TacGiaLienHe ==  search.UserId.Value.ToString() ||
                                        x.DongTacGias.Contains(search.UserId.Value.ToString()));
            }
            query = query.Include(x => x.NoiDangBao)
                .AsNoTracking();
            var result = await GetPageWithFilterAsync(query, pageIndex, pageSize);

            return result;
        }
       
    }
}
