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
    public class DonViChuTriRepository : RepositoryBase<DonViChuTri>, IDonViChuTriRepository
    {
        public DonViChuTriRepository(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<DonViChuTri?> GetByTenAsync(string ten)
        {
            var result = await _context.DonViChuTris.Where(x => x.Ten == ten).AsNoTracking().FirstOrDefaultAsync();
            return result;
        }
    }
}
