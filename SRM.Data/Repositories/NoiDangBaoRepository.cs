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
    public class NoiDangBaoRepository : RepositoryBase<NoiDangBao>, INoiDangBaoRepository
    {
        public NoiDangBaoRepository(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<bool> ExistsAsync(string ten)
        {
            bool result = await _context.NoiDangBaos.Where(x => x.Ten == ten.Trim()).AnyAsync();
            return result;
        }
    }
}
