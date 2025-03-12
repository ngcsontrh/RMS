using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Business.Services;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;

namespace SRM.Server.Controllers
{
	[Route("api/don-vi-chu-tri")]
	[ApiController]
	public class DonViChuTriController : ControllerBase
	{
		private readonly IDonViChuTriService _DonViChuTriService;
		private readonly IValidator<DonViChuTriData> _validator;

		public DonViChuTriController(
			IDonViChuTriService DonViChuTriService,
			IValidator<DonViChuTriData> validator
			)
		{
			_DonViChuTriService = DonViChuTriService;
			_validator = validator;
		}

		[HttpGet]
		public async Task<IResult> GetAsync(
			[FromQuery] int pageIndex = 1,
			[FromQuery] int pageSize = 10
			)
		{
			var result = await _DonViChuTriService.GetPageAsync(pageIndex, pageSize);
			return Results.Ok(result);
		}

		[HttpGet("{id}")]
		public async Task<IResult> GetAsync(int id)
		{
			var result = await _DonViChuTriService.GetAsync(id);
			if (result == null)
			{
				return Results.NotFound();
			}
			return Results.Ok(result);
		}

		[HttpPost]
		public async Task<IResult> AddAsync([FromBody] DonViChuTriData model)
		{
			var validateResult = await _validator.ValidateAsync(model);
			if (!validateResult.IsValid)
			{
				return Results.ValidationProblem(ModelState.ToDictionary(
					x => x.Key,
					x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
				));
			}

			var result = await _DonViChuTriService.AddAsync(model);
			return Results.Created();
		}

		[HttpPut("{id}")]
		public async Task<IResult> UpdateAsync(int id, [FromBody] DonViChuTriData model)
		{
			var validateResult = await _validator.ValidateAsync(model);
			if (!validateResult.IsValid)
			{
				return Results.ValidationProblem(ModelState.ToDictionary(
					x => x.Key,
					x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
				));
			}

			model.Id = id;
			var result = await _DonViChuTriService.UpdateAsync(model);
			return Results.Ok();
		}

		[HttpDelete("{id}")]
		public async Task<IResult> DeleteAsync(int id)
		{
			await _DonViChuTriService.DeleteAsync(id);
			return Results.NoContent();
		}
	}
}
