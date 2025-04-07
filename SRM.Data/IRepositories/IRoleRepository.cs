using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface IRoleRepository : IRepositoryBase<Role>
    {    
        Task<Role> GetByNameAsync(string name);
    }
}
