using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SRM.Business.IServices;
using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using SRM.Shared.Utils;
using System.Data;

namespace SRM.Server.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IValidator<LoginData> _loginValidator;
        private readonly IValidator<RegisterData> _registerValidator;

        public UserController(
            IUserService userService,
            IValidator<LoginData> loginValidator,
            IValidator<RegisterData> registerValidator
            )
        {
            _userService = userService;
            _loginValidator = loginValidator;
            _registerValidator = registerValidator;
        }

        [HttpPost("login")]
        public async Task<ExecuteData> LoginAsync(LoginData loginData)
        {
            var validateResult = await _loginValidator.ValidateAsync(loginData);
            if (!validateResult.IsValid)
            {
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.InvalidData
                };
            }
            var result = await _userService.LoginAsync(loginData);
            if (result.Success)
            {
                var tokenData = result.Data as TokenData;
                Response.Cookies.Append("refreshToken", tokenData.RefreshToken!, new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = tokenData.Expiration!.Value.AddDays(1),
                });
            }
            return result;
        }

        [HttpGet("dropdown")]
        [Authorize]
        public async Task<ExecuteData> GetDropdownAsync()
        {
            var result = await _userService.GetDropdownAsync();
            return result;
        }

        [HttpPost("register")]
        [Authorize]
        public async Task<ExecuteData> RegisterAsync(RegisterData registerData)
        {
            var validateResult = await _registerValidator.ValidateAsync(registerData);
            if (!validateResult.IsValid)
            {
                return new ExecuteData
                {
                    Success = false,
                    Message = validateResult.ToString()
                };
            }
            var result = await _userService.RegisterAsync(registerData);
            return result;
        }

        [HttpPost("refresh-token")]
        public ExecuteData RefreshTokenAsync()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return new ExecuteData
                {
                    Success = false,
                    Message = "Refresh token is required"
                };
            }
            var result = _userService.RefreshToken(refreshToken);
            if (result.Success)
            {
                var tokenData = result.Data as TokenData;
                Response.Cookies.Append("refreshToken", tokenData.RefreshToken!, new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = tokenData.Expiration!.Value.AddDays(1),
                });
            }
            return result;
        }
    }
}
