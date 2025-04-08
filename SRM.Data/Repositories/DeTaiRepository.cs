
using Microsoft.EntityFrameworkCore;
using SRM.Data.IRepositories;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class DeTaiRepository : RepositoryBase<DeTai>, IDeTaiRepository
    {
        public DeTaiRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<DeTai?> GetDetailAsync(Guid id)
        {
            var entity = await _context.DeTais
                .Where(d => d.Id == id)
                .Include(d => d.CapDeTai)
                .Include(d => d.DonViChuTri)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            return entity;
        }

        public async Task<(List<DeTai>, int)> GetPageDetailAsync(int pageIndex, int pageSize)
        {
            var entities = await _context.DeTais
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Include(x => x.CapDeTai)
                .Include(x => x.DonViChuTri)
                .AsNoTracking()
                .ToListAsync();
            var count = await _context.DeTais.CountAsync();
            return (entities, count);
        }
    }
}
