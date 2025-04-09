using Microsoft.EntityFrameworkCore;
using SRM.Data.IRepositories;
using SRM.Domain.Data;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<AuthData> GetAuthDataAsync(string username)
        {
            var authData = await _context.Users
                .AsNoTracking()
                .Where(u => u.Username == username)
                .Select(u => new AuthData
                {
                    Id = u.Id,
                    Username = u.Username,
                    Roles = u.UserRoles.Select(ur => ur.Role).Select(r => r.Name).ToList(),
                })
                .FirstAsync();
            return authData;
        }

        public Task<User?> GetByEmailAsync(string email)
        {
            var user = _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public Task<User?> GetByMaVienChucAsync(string maVienChuc)
        {
            var users = _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.MaVienChuc == maVienChuc);
            return users;
        }

        public async Task<User?> GetBySoDienThoaiAsync(string soDienThoai)
        {
            var users = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.SoDienThoai == soDienThoai);
            return users;
        }

        public Task<User?> GetByUsernameAsync(string username)
        {
            var user = _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Username.ToUpper() == username.ToUpper());
            return user;
        }

        public async Task<string> GetHashedPasswordAsync(string username)
        {
            var hashedPassword = await _context.Users
                    .Where(x => x.Username == username)
                    .Select(x => x.Password)
                    .FirstAsync();
            return hashedPassword;
        }

        public async Task<List<User>> GetListBasicInfoAsync()
        {
            var users = await _context.Users
                .AsNoTracking()
                .Select(u => new User
                {
                    Id = u.Id,
                    Username = u.Username,
                    HoTen = u.HoTen,
                    MaVienChuc = u.MaVienChuc,
                    SoDienThoai = u.SoDienThoai,
                    Email = u.Email
                })
                .ToListAsync();
            return users;
        }
    }
}
