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
    public class RoleRepository : RepositoryBase<Role>, IRoleRepository
    {
        public RoleRepository(AppDbContext context) : base(context)
        {
        }

        public Task<Role> GetByNameAsync(string name)
        {
            var role = _context.Roles
                .AsNoTracking()
                .FirstAsync(r => r.Name == name);
            return role;
        }
    }
}
