using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using SRM.Data.IRepositories;
using System.Security.Claims;

namespace SRM.Server.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public class PermissionAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private readonly string _requiredPermission;

        public PermissionAttribute(string requiredPermission)
        {
            _requiredPermission = requiredPermission;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            try
            {
                var serviceProvider = context.HttpContext.RequestServices;
                var userRepository = serviceProvider.GetRequiredService<IUserRepository>();
                var memoryCache = serviceProvider.GetRequiredService<IMemoryCache>();
                var logger = serviceProvider.GetRequiredService<ILogger<PermissionAttribute>>();

                var userId = context.HttpContext.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    context.Result = new StatusCodeResult(StatusCodes.Status401Unauthorized);
                    return;
                }

                var userRole = context.HttpContext.User?.Claims.Where(c => c.Type == ClaimTypes.Role).Select(x => x.Value!).ToList();
                if (userRole!.Contains("Admin"))
                {
                    return;
                }

                string cacheKey = $"UserPermissions_{userId}";
                IEnumerable<string>? permissions;

                if (!memoryCache.TryGetValue(cacheKey, out permissions))
                {
                    permissions = await userRepository.GetPermissionsAsync(Convert.ToInt32(userId));
                    var cacheEntryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30),
                        SlidingExpiration = TimeSpan.FromMinutes(5)
                    };
                    memoryCache.Set(cacheKey, permissions, cacheEntryOptions);
                }

                if (!permissions!.Contains(_requiredPermission))
                {
                    context.Result = new ForbidResult();
                    return;
                }
            }
            catch (Exception ex)
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<PermissionAttribute>>();
                logger.LogError(ex.Message);
                context.Result = new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}