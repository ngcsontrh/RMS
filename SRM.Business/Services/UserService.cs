using AutoMapper;
using Azure;
using Castle.Core.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using SRM.Shared.Utils;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IUserRepository _userRepository;
        private readonly IQuaTrinhCongTacRepository _quaTrinhCongTacRepository;
        private readonly ILyLichKhoaHocRepository _lyLichKhoaHocRepository;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;
        private readonly ILogger<UserService> _logger;
        private readonly IMapper _mapper;

        public UserService(
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IUserRepository userRepository,
            ILogger<UserService> logger,
            IMapper mapper,
            IConfiguration configuration,
            IQuaTrinhCongTacRepository quaTrinhCongTacRepository,
            ILyLichKhoaHocRepository lyLichKhoaHocRepository,
            IMemoryCache memoryCache
            )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _userRepository = userRepository;
            _logger = logger;
            _mapper = mapper;
            _configuration = configuration;
            _lyLichKhoaHocRepository = lyLichKhoaHocRepository;
            _quaTrinhCongTacRepository = quaTrinhCongTacRepository;
            _memoryCache = memoryCache;
        }

        public async Task<ExecuteData> GetDropdownAsync()
        {
            try
            {
                var entities = await _userRepository.GetDropdownAsync();
                var result = _mapper.Map<List<UserData>>(entities);
                return new ExecuteData
                {
                    Success = true,
                    Data = result
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError,
                };
            }
        }

        public async Task<ExecuteData> GetPageAsync(UserSearch search, int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var entityResult = await _userRepository.GetPageDataAsync(search, pageIndex, pageSize);
                return new ExecuteData
                {
                    Success = true,
                    Data = new PageData<UserData>
                    {
                        Items = _mapper.Map<List<UserData>>(entityResult.Item1),
                        Total = entityResult.Item2
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError,
                };
            }
        }

        public async Task<ExecuteData> LoginAsync(LoginData loginData)
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
            var claims = await _userRepository.GetClaimsAsync(user);
            var tokenData = GenerateToken(claims);
            return new ExecuteData
            {
                Success = true,
                Data = tokenData
            };
        }

        public ExecuteData RefreshToken(string refreshToken)
        {
            try
            {
                if (!_memoryCache.TryGetValue(refreshToken, out List<Claim>? claims))
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.InvalidRefreshToken
                    };
                }
                _memoryCache.Remove(refreshToken);
                var tokenData = GenerateToken(claims!);
                return new ExecuteData
                {
                    Success = true,
                    Data = tokenData
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

        public async Task<ExecuteData> RegisterAsync(RegisterData registerData)
        {
            try
            {
                await _userRepository.BeginTransactionAsync();                

                var user = _mapper.Map<User>(registerData);
                var registerResult = await _userManager.CreateAsync(user, registerData.Password!);
                if (!registerResult.Succeeded)
                {
                    throw new Exception(registerResult.ToString());
                }

                var addRoleResult = await _userManager.AddToRoleAsync(user, registerData.RoleName!);
                if (!addRoleResult.Succeeded)
                {
                    throw new Exception(addRoleResult.ToString());
                }

                var lyLichKhoaHoc = new LyLichKhoaHoc { UserId = user.Id };
                var quaTrinhCongTac = new QuaTrinhCongTac { UserId = user.Id };

                await _lyLichKhoaHocRepository.AddAsync(lyLichKhoaHoc);
                await _quaTrinhCongTacRepository.AddAsync(quaTrinhCongTac);

                await _userRepository.CommitTransactionAsync();

                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.RegisterSuccessful
                };
            }
            catch (Exception ex)
            {
                await _userRepository.RollbackTransactionAsync();
                _logger.LogError(ex.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError
                };
            }
        }

        private TokenData GenerateToken(List<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: credentials);

            string accessToken = new JwtSecurityTokenHandler().WriteToken(token);
            string refreshToken = Guid.NewGuid().ToString();
            _memoryCache.Set(refreshToken, claims, token.ValidTo.AddDays(1));
            var tokenData = new TokenData
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Expiration = token.ValidTo
            };
            return tokenData;
        }
    }
}
