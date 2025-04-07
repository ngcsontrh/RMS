using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Domain.Data;

namespace SRM.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonViChuTriController : ControllerBase
    {
        private readonly IDonViChuTriService _DonViChuTriService;

        public DonViChuTriController(IDonViChuTriService DonViChuTriService)
        {
            _DonViChuTriService = DonViChuTriService;
        }

        [HttpPost("create")]
        public async Task<IResult> AddAsync([FromBody] DonViChuTriData data)
        {
            var result = await _DonViChuTriService.AddAsync(data);
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
        public async Task<IResult> UpdateAsync([FromBody] DonViChuTriData data)
        {
            var result = await _DonViChuTriService.UpdateAsync(data);
            if (result)
            {
                return Results.NoContent();
            }
            else
            {
                return Results.BadRequest(new { message = "Cập nhật thất bại" });
            }
        }

        [HttpPost("delete")]
        public async Task<IResult> DeleteAsync([FromBody] GuidData data)
        {
            var result = await _DonViChuTriService.DeleteAsync(data.Id);
            if (result)
            {
                return Results.NoContent();
            }
            else
            {
                return Results.BadRequest(new { message = "Xóa thất bại" });
            }
        }

        [HttpGet("list")]
        public async Task<IResult> GetListAsync()
        {
            var result = await _DonViChuTriService.GetListAsync();
            if (result.Item1)
            {
                return Results.Ok(result.Item2);
            }
            else
            {
                return Results.NotFound(new { message = "Không tìm thấy dữ liệu" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetByIdAsync(Guid id)
        {
            var result = await _DonViChuTriService.GetByIdAsync(id);
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
            var result = await _DonViChuTriService.GetPageAsync(pageIndex, pageSize);
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
