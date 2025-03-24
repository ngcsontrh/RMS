using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Shared.Models.Data;

namespace SRM.Server.Controllers
{
    [Route("api/qua-trinh-cong-tac")]
    [ApiController]
    public class QuaTrinhCongTacController : ControllerBase
    {
        private readonly IQuaTrinhCongTacService _quaTrinhCongTacService;

        public QuaTrinhCongTacController(IQuaTrinhCongTacService quaTrinhCongTacService)
        {
            _quaTrinhCongTacService = quaTrinhCongTacService;
        }

        [HttpGet("info")]
        public async Task<ExecuteData> GetByUserIdAsync(int userId)
        {
            var result = await _quaTrinhCongTacService.GetByUserIdAsync(userId);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] QuaTrinhCongTacData model)
        {
            model.Id = id;
            var result = await _quaTrinhCongTacService.UpdateAsync(model);
            return result;
        }

        [HttpPost]
        public async Task<ExecuteData> AddAsync([FromBody] QuaTrinhCongTacData model)
        {
            var result = await _quaTrinhCongTacService.AddAsync(model);
            return result;
        }
    }
}
