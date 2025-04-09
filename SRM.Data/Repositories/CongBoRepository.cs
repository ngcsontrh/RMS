
using Microsoft.EntityFrameworkCore;
using SRM.Data.IRepositories;
using SRM.Domain.Entities;
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

        public async Task<CongBo?> GetDetailAsync(Guid id)
        {
            var entity = await _context.CongBos
                .Where(x => x.Id == id)
                .Include(x => x.NoiDangBao)
                .Include(x => x.ThanhQua)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            return entity;
        }

        public async Task<(List<CongBo>, int)> GetPageDetailAsync(int pageIndex, int pageSize)
        {
            var entities = await _context.CongBos
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Include(x => x.NoiDangBao)
                .Include(x => x.ThanhQua)
                .AsNoTracking()
                .ToListAsync();
            var count = await _context.CongBos.CountAsync();
            return (entities, count);
        }
    }
}
