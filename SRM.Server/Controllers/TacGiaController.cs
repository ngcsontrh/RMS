using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using OneOf.Types;
using SRM.Business.IServices;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using SRM.Shared.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SRM.Server.Controllers
{
    [Route("api/tac-gia")]
    [ApiController]
    public class TacGiaController : ControllerBase
    {
        private readonly ITacGiaService _tacGiaService;
        private readonly IValidator<TacGiaData> _validator;

        public TacGiaController(ITacGiaService tacGiaService, IValidator<TacGiaData> validator)
        {
            _tacGiaService = tacGiaService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IResult> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var search = new CongBoSearch();
            var result = await _tacGiaService.GetPageAsync(pageIndex, pageSize);
            return Results.Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetAsync(int id)
        {
            var result = await _tacGiaService.GetAsync(id);
            if (result == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(result);
        }

        [HttpPost]
        public async Task<IResult> AddAsync([FromBody] TacGiaData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return Results.ValidationProblem(ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
                ));
            }

            await _tacGiaService.AddAsync(model);
            return Results.Created();
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdateAsync(int id, [FromBody] TacGiaData model)
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
            await _tacGiaService.UpdateAsync(model);
            return Results.NoContent();
        }

        [HttpGet("dropdown-data")]
        public async Task<IResult> GetDropDownDataAsync()
        {
            var result = await _tacGiaService.GetDropDownDataAsync();
            return Results.Ok(result);
        }
    }
}
