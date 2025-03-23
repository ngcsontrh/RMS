using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface IUserRepository
    {
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
        Task<List<Claim>> GetClaimsAsync(User user);
        Task<(List<User>, int)> GetPageDataAsync(UserSearch search, int pageIndex = 1, int pageSize = 10);
        Task<List<User>> GetDropdownAsync();
    }
}
