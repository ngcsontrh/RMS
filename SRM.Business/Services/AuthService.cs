using AutoMapper;
using Castle.Core.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Enums;
using SRM.Shared.Models.Data;
using SRM.Shared.Utils;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IUserRepository _userRepository;
        private readonly IMemoryCache _memoryCache;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthService> _logger;
        private readonly IMapper _mapper;

        public AuthService(
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IMemoryCache memoryCache,
            IConfiguration configuration,
            ILogger<AuthService> logger,
            IUserRepository userRepository,
            IMapper mapper
            )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _memoryCache = memoryCache;
            _configuration = configuration;
            _logger = logger;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<ExecuteData> GetMeAsync(string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                var roles = await _userManager.GetRolesAsync(user!);
                var permissions = new HashSet<string>();
                if (roles.Contains("Admin"))
                {
                    foreach(var permission in Enum.GetValues<Permission>())
                    {
                        permissions.Add(permission.ToString());
                    }
                }
                else
                {
                    permissions = await _userRepository.GetPermissionsAsync(user.Id);                    
                }
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                    Data = new AuthData
                    {
                        UserInfo = _mapper.Map<UserData>(user),
                        Roles = roles.ToHashSet(),
                        Permissions = permissions
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError
                };
            }
        }

        public async Task<ExecuteData> LoginAsync(LoginData loginData)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(loginData.UserName!);
                if (user == null || !await _userManager.CheckPasswordAsync(user, loginData.Password!))
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.InvalidCredentials
                    };
                }
                var result = await GenerateTokenAsync(user);
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                    Data = result
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError
                };
            }
        }

        public async Task<ExecuteData> RegisterAsync(RegisterData registerData)
        {
            try
            {
                var user = new User
                {
                    UserName = registerData.UserName,
                    Email = registerData.Email
                };
                var resgisterResult = await _userManager.CreateAsync(user, registerData.Password);
                if (!resgisterResult.Succeeded)
                {
                    throw new Exception(resgisterResult.Errors.First().Description);
                }
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError
                };
            }
        }

        private async Task<TokenData> GenerateTokenAsync(User user)
        {            
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var item in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, item));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: credentials);

            string accessToken = new JwtSecurityTokenHandler().WriteToken(token);
            var tokenData = new TokenData
            {
                AccessToken = accessToken,
                RefreshToken = Guid.NewGuid().ToString(),
                Expiration = token.ValidTo
            };
            return tokenData;
        }
    }
}
