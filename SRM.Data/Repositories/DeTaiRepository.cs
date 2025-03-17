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
            var query = CreateFilter(search);
            query = query.Include(x => x.CapDeTai)
                .Include(x => x.DonViChuTri);
            var result = await GetPageWithFilterAsync(query);
            return result;
        }

        private IQueryable<DeTai> CreateFilter(DeTaiSearch search)
        {
            var query = GetQueryable();
            if (search.TacGiaId.HasValue)
            {
                var tacGiaId = search.TacGiaId.Value.ToString();
                query = query.Where(x => x.ChuNhiem == search.TacGiaId.ToString()
                                    || x.CanBoThamGias != null && x.CanBoThamGias.Contains(search.TacGiaId.ToString()));
            }
            return query;
        }
    }
}
