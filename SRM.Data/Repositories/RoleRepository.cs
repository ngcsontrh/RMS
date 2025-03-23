using Microsoft.EntityFrameworkCore;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AppDbContext _context;
        public RoleRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddPermissionsAsync(Role role, List<string> permissions)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var userRoles = await _context.UserRoles
                    .Where(x => x.RoleId == role.Id)
                    .ToListAsync();

                var userIds = userRoles.Select(x => x.UserId).ToList();

                // Get role names to update the User Claims
                var roles = await _context.Roles.Where(x => x.Id == role.Id || userRoles.Any(ur => ur.RoleId == x.Id)).ToListAsync();
                var roleNames = roles.Select(x => x.Name).ToList();

                // Create RoleClaims for new permissions
                var rolePermissions = permissions.Select(permission => new RoleClaim
                {
                    RoleId = role.Id,
                    ClaimType = GlobalConstraint.Permission,
                    ClaimValue = permission
                });

                // Delete old permissions for the role
                await _context.RoleClaims
                    .Where(x => x.ClaimType == GlobalConstraint.Permission && x.RoleId == role.Id)
                    .ExecuteDeleteAsync();

                // Add new permissions
                await _context.RoleClaims.AddRangeAsync(rolePermissions);
                await _context.SaveChangesAsync();

                // Update UserClaims for roles and permissions
                await _context.UserClaims
                    .Where(x => userIds.Contains(x.UserId) && x.ClaimType == ClaimTypes.Role)
                    .ExecuteUpdateAsync(setter => setter.SetProperty(uc => uc.ClaimValue, string.Join(",", roleNames)));

                await _context.UserClaims
                    .Where(x => userIds.Contains(x.UserId) && x.ClaimType == GlobalConstraint.Permission)
                    .ExecuteUpdateAsync(setter => setter.SetProperty(uc => uc.ClaimValue, string.Join(",", permissions)));

                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

    }
}
