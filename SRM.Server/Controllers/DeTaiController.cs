using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Domain.Data;

namespace SRM.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeTaiController : ControllerBase
    {
        private readonly IDeTaiService _DeTaiService;

        public DeTaiController(IDeTaiService DeTaiService)
        {
            _DeTaiService = DeTaiService;
        }

        [HttpPost("create")]
        public async Task<IResult> AddAsync([FromBody] DeTaiData data)
        {
            var result = await _DeTaiService.AddAsync(data);
            if (result)
            {
                return Results.Created();
            }
            else
            {
                return Results.BadRequest(new { message = "Thêm thất bại" });
            }
        }

        [HttpPost("update")]
        public async Task<IResult> UpdateAsync([FromBody] DeTaiData data)
        {
            var result = await _DeTaiService.UpdateAsync(data);
            if (result)
            {
                return Results.NoContent();
            }
            else
            {
                return Results.BadRequest(new { message = "Cập nhật thất bại" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetByIdAsync(Guid id)
        {
            var result = await _DeTaiService.GetByIdAsync(id);
            if (result.Item1)
            {
                if (result.Item2 == null)
                {
                    return Results.NotFound(new { message = "Không tìm thấy dữ liệu" });
                }
                return Results.Ok(result.Item2);
            }
            else
            {
                return Results.Problem();
            }
        }

        [HttpGet("page")]
        public async Task<IResult> GetPageAsync([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _DeTaiService.GetPageAsync(pageIndex, pageSize);
            if (result.Item1)
            {
                return Results.Ok(result.Item2);
            }
            else
            {
                return Results.NotFound(new { message = "Không tìm thấy dữ liệu" });
            }
        }
    }
}
