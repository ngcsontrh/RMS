using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Business.Services;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;

namespace SRM.Server.Controllers
{
    [Route("api/de-tai")]
    [ApiController]
    public class DeTaiController : ControllerBase
    {
        private readonly IDeTaiService _deTaiService;
        private readonly IValidator<DeTaiData> _validator;

        public DeTaiController(IDeTaiService deTaiService, IValidator<DeTaiData> validator)
        {
            _deTaiService = deTaiService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IResult> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var search = new DeTaiSearch();
            var result = await _deTaiService.GetPageAsync(search, pageIndex, pageSize);
            return Results.Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetAsync(int id)
        {
            var result = await _deTaiService.GetAsync(id);
            if (result == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(result);
        }

        [HttpPost]
        public async Task<IResult> AddAsync([FromBody] DeTaiData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                var errors = validateResult.Errors
                    .GroupBy(e => e.PropertyName)
                    .ToDictionary(
                        g => g.Key,
                        g => g.Select(e => e.ErrorMessage).ToArray()
                    );
                return Results.ValidationProblem(errors);
            }

            var result = await _deTaiService.AddAsync(model);
            return Results.Created();
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdateAsync(int id, [FromBody] DeTaiData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                var errors = validateResult.Errors.Select(x => x.ErrorMessage).ToList();
                return Results.BadRequest(errors);
            }

            model.Id = id;
            var result = await _deTaiService.UpdateAsync(model);
            return Results.NoContent();
        }
    }
}
