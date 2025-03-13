using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Business.Services;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;

namespace SRM.Server.Controllers
{
	[Route("api/thanh-qua")]
	[ApiController]
	public class ThanhQuaController : ControllerBase
	{
		private readonly IThanhQuaService _ThanhQuaService;
		private readonly IValidator<ThanhQuaData> _validator;

		public ThanhQuaController(
			IThanhQuaService ThanhQuaService,
			IValidator<ThanhQuaData> validator
			)
		{
			_ThanhQuaService = ThanhQuaService;
			_validator = validator;
		}

		[HttpGet]
		public async Task<IResult> GetAsync(
			[FromQuery] int pageIndex = 1,
			[FromQuery] int pageSize = 10
			)
		{
			var result = await _ThanhQuaService.GetPageAsync(pageIndex, pageSize);
			return Results.Ok(result);
		}

		[HttpGet("{id}")]
		public async Task<IResult> GetAsync(int id)
		{
			var result = await _ThanhQuaService.GetAsync(id);
			if (result == null)
			{
				return Results.NotFound();
			}
			return Results.Ok(result);
		}

		[HttpPost]
		public async Task<IResult> AddAsync([FromBody] ThanhQuaData model)
		{
			var validateResult = await _validator.ValidateAsync(model);
			if (!validateResult.IsValid)
			{
				return Results.ValidationProblem(ModelState.ToDictionary(
					x => x.Key,
					x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
				));
			}

			var result = await _ThanhQuaService.AddAsync(model);
			return Results.Created();
		}

		[HttpPut("{id}")]
		public async Task<IResult> UpdateAsync(int id, [FromBody] ThanhQuaData model)
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
			var result = await _ThanhQuaService.UpdateAsync(model);
			return Results.Ok();
		}

		[HttpDelete("{id}")]
		public async Task<IResult> DeleteAsync(int id)
		{
			await _ThanhQuaService.DeleteAsync(id);
			return Results.NoContent();
		}
	}
}
