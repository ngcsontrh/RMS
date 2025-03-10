using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class DeTaiRepository : RepositoryBase<DeTai>, IDeTaiRepository
    {
        public DeTaiRepository(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<(List<DeTai>, int)> GetPageWithSearchAsync(DeTaiSearch search)
        {
            var query = GetQueryable();
            query = query.Include(x => x.CapDeTai)
                .Include(x => x.DonViChuTri);
            var result = await GetPageWithFilterAsync(query);
            return result;
        }
    }
}
