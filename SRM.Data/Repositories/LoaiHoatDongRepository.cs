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
    public class LoaiHoatDongRepository : RepositoryBase<LoaiHoatDong>, ILoaiHoatDongRepository
    {
        public LoaiHoatDongRepository(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<LoaiHoatDong?> GetByTenAsync(string ten)
        {
            var result = await _context.LoaiHoatDongs.Where(x => x.Ten == ten).AsNoTracking().FirstOrDefaultAsync();
            return result;
        }
    }
}
