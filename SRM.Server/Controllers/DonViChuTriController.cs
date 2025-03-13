using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Shared.Models.Data;
using System.Threading.Tasks;

namespace SRM.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class DonViChuTriController : ControllerBase
	{
		private readonly IDonViChuTriService _donViChuTriService;

		public DonViChuTriController(IDonViChuTriService donViChuTriService)
		{
			_donViChuTriService = donViChuTriService;
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetAsync(int id)
		{
			var result = await _donViChuTriService.GetAsync(id);
			if (result == null)
			{
				return NotFound();
			}
			return Ok(result);
		}

		[HttpPost]
		public async Task<IActionResult> AddAsync([FromBody] DonViChuTriData model)
		{
			if (model == null)
			{
				return BadRequest("Invalid data.");
			}

			await _donViChuTriService.AddAsync(model);
			return Ok("Added successfully.");
		}

		[HttpPut]
		public async Task<IActionResult> UpdateAsync([FromBody] DonViChuTriData model)
		{
			if (model == null)
			{
				return BadRequest("Invalid data.");
			}

			await _donViChuTriService.UpdateAsync(model);
			return Ok("Updated successfully.");
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAsync(int id)
		{
			await _donViChuTriService.DeleteAsync(id);
			return Ok("Deleted successfully.");
		}

		[HttpGet("page")]
		public async Task<IActionResult> GetPageAsync(int pageIndex = 1, int pageSize = 10)
		{
			var result = await _donViChuTriService.GetPageAsync(pageIndex, pageSize);
			return Ok(result);
		}
	}
}
