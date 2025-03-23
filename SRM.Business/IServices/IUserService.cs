using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IUserService
    {
        Task<ExecuteData> GetDropdownAsync();
        Task<ExecuteData> RegisterAsync(RegisterData registerDate);
        Task<ExecuteData> LoginAsync(LoginData loginData);
        ExecuteData RefreshToken(string refreshToken);
        Task<ExecuteData> GetPageAsync(UserSearch search, int pageIndex = 1, int pageSize = 10);
    }
}
