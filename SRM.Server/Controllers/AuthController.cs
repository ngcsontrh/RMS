using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Domain.Data;

namespace SRM.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginData request)
        {
            var result = await _authService.LoginAsync(request);
            if (!result.Item1)
            {
                return Unauthorized();
            }
            return Ok(result.Item2);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized();
            }
            var result = await _authService.GetMeAsync(username);
            if (!result.Item1)
            {
                return NotFound();
            }
            return Ok(result.Item2);
        }
    }
}
