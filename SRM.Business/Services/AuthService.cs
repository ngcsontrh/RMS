using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Domain.Data;
using SRM.Utils;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<AuthService> _logger;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, ILogger<AuthService> logger, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _logger = logger;
            _configuration = configuration;
        }

        public async Task<(bool, AuthData?)> GetMeAsync(string username)
        {
            try
            {
                var authData = await _userRepository.GetAuthDataAsync(username);
                return (true, authData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching user data for username: {Username}", username);
                return (false, null);
            }
        }

        public async Task<(bool, TokenData?)> LoginAsync(LoginData loginData)
        {
            try
            {
                var user = await _userRepository.GetByUsernameAsync(loginData.Username);
                if (user == null || !PasswordHelper.VerifyPassword(user.Password, loginData.Password))
                {
                    _logger.LogWarning("Invalid login attempt for username: {Username}", loginData.Username);
                    return (false, null);
                }
                var authData = await _userRepository.GetAuthDataAsync(loginData.Username);
                var tokenData = ProcessToken(authData);
                return (true, tokenData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login for username: {Username}", loginData.Username);
                return (false, null);
            }           
        }

        private TokenData ProcessToken(AuthData user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()!),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, string.Join(",", user.Roles))
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = _configuration["Jwt:Audience"],
                Issuer = _configuration["Jwt:Issuer"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(token);
            var refreshToken = Guid.NewGuid().ToString();

            return new TokenData
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Expiration = tokenDescriptor.Expires!.Value
            };
        }
    }
}
