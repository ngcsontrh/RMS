using SRM.Data.IRepositories;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class DonViRepository : RepositoryBase<DonVi>, IDonViRepository
    {
        public DonViRepository(AppDbContext context) : base(context)
        {
        }
    }
}
