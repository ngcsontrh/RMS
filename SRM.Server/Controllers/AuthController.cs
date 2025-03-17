using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Shared.Models.Data;
using SRM.Shared.Utils;
using System.Security.Claims;

namespace SRM.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ExecuteData> LoginAsync([FromBody] LoginData model)
        {
            var result = await _authService.LoginAsync(model);
            return result;
        }

        [HttpPost("register")]
        public async Task<ExecuteData> RegisterAsync([FromBody] RegisterData model)
        {
            var result = await _authService.RegisterAsync(model);
            return result;
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ExecuteData> GetMeAsync()
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.NotFound };
            }
            var result = await _authService.GetMeAsync(userId);
            return result;
        }
    }
}
