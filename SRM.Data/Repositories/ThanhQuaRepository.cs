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
    public class ThanhQuaRepository : RepositoryBase<ThanhQua>, IThanhQuaRepository
    {
        public ThanhQuaRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<bool> ExistsAsync(string ten)
        {
            bool exists = await _context.ThanhQuas.Where(x => x.Ten == ten).AnyAsync();
            return exists;
        }
    }
}
