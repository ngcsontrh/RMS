using Microsoft.EntityFrameworkCore;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<HashSet<string>> GetPermissionsAsync(int userId)
        {
            var rolePermissions = await _context.UserRoles
                .Where(ur => ur.UserId == userId)
                .Include(ur => ur.Role)
                    .ThenInclude(r => r.RoleClaims)
                .AsNoTracking()
                .SelectMany(ur => ur.Role.RoleClaims.Select(rc => rc.ClaimValue!).ToList())
                .ToListAsync();

            var userPermissions = await _context.UserClaims
                .Where(uc => uc.UserId == userId)
                .Select(uc => uc.ClaimValue!)
                .AsNoTracking()
                .ToListAsync();
            var permissions = rolePermissions.Concat(userPermissions).ToHashSet();
            return permissions;
        }

        public async Task<(HashSet<string>, HashSet<string>)> GetRolesAndPermissionsAsync(int userId)
        {
            var rolesAndPermissions = await _context.UserRoles
                .Where(ur => ur.UserId == userId)
                .Include(ur => ur.Role)
                    .ThenInclude(r => r.RoleClaims)
                .AsNoTracking()
                .Select(ur => new
                {
                    Role = ur.Role.Name,
                    Permissions = ur.Role.RoleClaims.Select(rc => rc.ClaimValue!).ToList()
                })
                .ToListAsync();            

            var userPermissions = await _context.UserClaims
                .Where(uc => uc.UserId == userId)
                .Select(uc => uc.ClaimValue!)
                .AsNoTracking()
                .ToListAsync();
            var role = rolesAndPermissions.Select(r => r.Role!).ToHashSet();
            var permissions = rolesAndPermissions.SelectMany(r => r.Permissions!).Concat(userPermissions).ToHashSet();
            return (role, permissions);
        }
    }
}
