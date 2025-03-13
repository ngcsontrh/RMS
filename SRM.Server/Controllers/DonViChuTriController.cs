using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Shared.Models.Data;

namespace SRM.Server.Controllers
{
    [Route("api/don-vi-chu-tri")]
    [ApiController]
	public class DonViChuTriController : ControllerBase
	{
		private readonly IDonViChuTriService _donViChuTriService;
		private readonly IValidator<DonViChuTriData> _donViChuTriDataValidator;

		public DonViChuTriController(
			IDonViChuTriService donViChuTriService,
			IValidator<DonViChuTriData> donViChuTriDataValidator
			)
		{
			_donViChuTriService = donViChuTriService ?? throw new ArgumentNullException(nameof(donViChuTriService));
			_donViChuTriDataValidator = donViChuTriDataValidator ?? throw new ArgumentNullException(nameof(donViChuTriDataValidator));
		}

		[HttpGet]
		public async Task<IResult> GetAsync(
			[FromQuery] int pageIndex = 1,
			[FromQuery] int pageSize = 10
			)
		{
			var result = await _donViChuTriService.GetPageAsync(pageIndex, pageSize);
			return Results.Ok(result);
		}

		[HttpGet("{id:int}")]
		public async Task<IResult> GetByIdAsync(int id)
		{
			var result = await _donViChuTriService.GetAsync(id);
			if (result == null)
			{
				return Results.NotFound();
			}
			return Results.Ok(result);
		}

		[HttpPost]
		public async Task<IResult> AddAsync([FromForm] DonViChuTriData model)
		{
			var validateResult = await _donViChuTriDataValidator.ValidateAsync(model);
			if (!validateResult.IsValid)
			{
				return Results.ValidationProblem(ModelState.ToDictionary(
					x => x.Key,
					x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
				));
			}

			await _donViChuTriService.AddAsync(model);
			return Results.Created();
		}

		[HttpPut("{id:int}")]
		public async Task<IResult> UpdateAsync(int id, [FromForm] DonViChuTriData model)
		{
			var validateResult = await _donViChuTriDataValidator.ValidateAsync(model);
			if (!validateResult.IsValid)
			{
				return Results.ValidationProblem(ModelState.ToDictionary(
					x => x.Key,
					x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
				));
			}

			model.Id = id;
			await _donViChuTriService.UpdateAsync(model);
			return Results.Ok();
		}
	}
}

