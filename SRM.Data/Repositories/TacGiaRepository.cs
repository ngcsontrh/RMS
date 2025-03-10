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
    public class TacGiaRepository : RepositoryBase<TacGia>, ITacGiaRepository
    {
        public TacGiaRepository(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<List<TacGia>> GetDropDownDataAsync()
        {
            var result = await _context.TacGias.Select(x => new TacGia
            {
                Id = x.Id,
                Ten = x.Ten,
            }).ToListAsync();
            return result;
        }
    }
}
