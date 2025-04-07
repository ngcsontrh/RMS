
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
    public class NoiDangBaoRepository : RepositoryBase<NoiDangBao>, INoiDangBaoRepository
    {
        public NoiDangBaoRepository(AppDbContext context) : base(context)
        {
        }
    }
}
