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
    public class QuaTrinhCongTacRepository : RepositoryBase<QuaTrinhCongTac>, IQuaTrinhCongTacRepository
    {
        public QuaTrinhCongTacRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<QuaTrinhCongTac?> GetByUserIdAsync(int userId)
        {
            var entity = await _context.Set<QuaTrinhCongTac>()
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync();
            return entity;
        }
    }
}
