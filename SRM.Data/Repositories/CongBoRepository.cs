
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
    }
}
