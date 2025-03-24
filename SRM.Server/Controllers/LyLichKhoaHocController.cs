using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Shared.Models.Data;

namespace SRM.Server.Controllers
{
    [ApiController]
    [Route("api/ly-lich-khoa-hoc")]
    public class LyLichKhoaHocController : ControllerBase
    {
        private readonly ILyLichKhoaHocService _lyLichKhoaHocService;

        public LyLichKhoaHocController(ILyLichKhoaHocService lyLichKhoaHocService)
        {
            _lyLichKhoaHocService = lyLichKhoaHocService;
        }

        [HttpGet("info")]
        public async Task<ExecuteData> GetByUserIdAsync(int userId)
        {
            var result = await _lyLichKhoaHocService.GetByUserIdAsync(userId);
            return result;
        }
        
        [HttpPut("{id}")]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] LyLichKhoaHocData model)
        {
            model.Id = id;
            var result = await _lyLichKhoaHocService.UpdateAsync(model);
            return result;
        }        
    }
}
