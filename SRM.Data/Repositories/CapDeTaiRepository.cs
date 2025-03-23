using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class CapDeTaiRepository : RepositoryBase<CapDeTai>, ICapDeTaiRepository
    {
        public CapDeTaiRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<CapDeTai?> GetByTenAsync(string ten)
        {
            var result = await _context.CapDeTais.Where(x => x.Ten == ten).AsNoTracking().FirstOrDefaultAsync();
            return result;
        }
    }
}
