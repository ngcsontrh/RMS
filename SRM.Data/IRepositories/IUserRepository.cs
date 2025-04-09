using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task<string> GetHashedPasswordAsync(string username);
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByMaVienChucAsync(string maVienChuc);
        Task<User?> GetBySoDienThoaiAsync(string soDienThoai);
        Task<AuthData> GetAuthDataAsync(string username);
        Task<List<User>> GetListBasicInfoAsync();
    }
}
