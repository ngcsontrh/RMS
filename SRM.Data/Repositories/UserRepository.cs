using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Models.Search;
using SRM.Shared.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private IDbContextTransaction? _transaction;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }        

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            await _transaction.CommitAsync();
            await _transaction.DisposeAsync();
            _transaction = null;
        }

        public async Task<List<Claim>> GetClaimsAsync(User user)
        {
            var role = await _context.Roles.FirstOrDefaultAsync(x => x.UserRoles.Any(ur => ur.UserId == user.Id));
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                new Claim(ClaimTypes.MobilePhone, user.PhoneNumber ?? string.Empty),
                new Claim(ClaimTypes.Role, role?.Name ?? string.Empty),
            };
            return claims;
        }

        public async Task<List<User>> GetDropdownAsync()
        {
            var data = await _context.Users.Select(x => new User
            {
                Id = x.Id,
                UserName = x.UserName,
                FullName = x.FullName,
                Code = x.Code,
            }).ToListAsync();
            return data;
        }

        public async Task<(List<User>, int)> GetPageDataAsync(UserSearch search, int pageIndex = 1, int pageSize = 10)
        {
            var query = CreateFilter(search);
            var data = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            var total = await _context.Users.CountAsync();
            return (data, total);
        }

        public async Task RollbackTransactionAsync()
        {
            await _transaction!.RollbackAsync();
            await _transaction.DisposeAsync();
            _transaction = null;
        }

        private IQueryable<User> CreateFilter(UserSearch search)
        {
            IQueryable<User> query = _context.Users;
            if (search.Id.HasValue)
            {
                query = query.Where(x => x.Id == search.Id);
            }
            if (!string.IsNullOrEmpty(search.UserName))
            {
                query = query.Where(x => x.UserName.Contains(search.UserName));
            }
            if (!string.IsNullOrEmpty(search.Email))
            {
                query = query.Where(x => x.Email.Contains(search.Email));
            }
            if (!string.IsNullOrEmpty(search.Code))
            {
                query = query.Where(x => x.Code.Contains(search.Code));
            }
            if (!string.IsNullOrEmpty(search.PhoneNumber))
            {
                query = query.Where(x => x.PhoneNumber.Contains(search.PhoneNumber));
            }
            return query;
        }
    }
}
