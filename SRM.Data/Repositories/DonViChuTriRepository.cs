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
    public class DonViChuTriRepository : RepositoryBase<DonViChuTri>, IDonViChuTriRepository
    {
        public DonViChuTriRepository(AppDbContext context) : base(context)
        {
        }
    }
}
