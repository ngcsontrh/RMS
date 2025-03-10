using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Business.Services;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;

namespace SRM.Server.Controllers
{
    [Route("api/cap-de-tai")]
    [ApiController]
    public class CapDeTaiController : ControllerBase
    {
        private readonly ICapDeTaiService _capDeTaiService;
        private readonly IValidator<CapDeTaiData> _validator;

        public CapDeTaiController(
            ICapDeTaiService capDeTaiService,
            IValidator<CapDeTaiData> validator
            )
        {
            _capDeTaiService = capDeTaiService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IResult> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var result = await _capDeTaiService.GetPageAsync(pageIndex, pageSize);
            return Results.Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetAsync(int id)
        {
            var result = await _capDeTaiService.GetAsync(id);
            if (result == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(result);
        }

        [HttpPost]
        public async Task<IResult> AddAsync([FromForm] CapDeTaiData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return Results.ValidationProblem(ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
                ));
            }

            var result = await _capDeTaiService.AddAsync(model);
            return Results.Created();
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdateAsync(int id, [FromForm] CapDeTaiData model)
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
            var result = await _capDeTaiService.UpdateAsync(model);
            return Results.Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IResult> DeleteAsync(int id)
        {
            await _capDeTaiService.DeleteAsync(id);
            return Results.NoContent();
        }
    }
}
