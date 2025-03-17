using SRM.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface IUserRepository
    {
        Task<(HashSet<string>, HashSet<string>)> GetRolesAndPermissionsAsync(int userId);
        Task<HashSet<string>> GetPermissionsAsync(int userId);
    }
}
