using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Business.Services;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;

namespace SRM.Server.Controllers
{
    [Route("api/noi-dang-bao")]
    [ApiController]
    public class NoiDangBaoController : ControllerBase
    {
        private readonly INoiDangBaoService _noiDangBaoService;
        private readonly IValidator<NoiDangBaoData> _validator;

        public NoiDangBaoController(
            INoiDangBaoService noiDangBaoService,
            IValidator<NoiDangBaoData> validator
            )
        {
            _noiDangBaoService = noiDangBaoService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IResult> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var result = await _noiDangBaoService.GetPageAsync(pageIndex, pageSize);
            return Results.Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetAsync(int id)
        {
            var result = await _noiDangBaoService.GetAsync(id);
            if (result == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(result);
        }

        [HttpPost]
        public async Task<IResult> AddAsync([FromBody] NoiDangBaoData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return Results.ValidationProblem(ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
                ));
            }

            var result = await _noiDangBaoService.AddAsync(model);
            return Results.Created();
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdateAsync(int id, [FromBody] NoiDangBaoData model)
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
            var result = await _noiDangBaoService.UpdateAsync(model);
            return Results.Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IResult> DeleteAsync(int id)
        {
            await _noiDangBaoService.DeleteAsync(id);
            return Results.NoContent();
        }
        [HttpGet("dropdown-data")]
        public async Task<IResult> GetDropDownDataAsync()
        {
            var result = await _noiDangBaoService.GetDropDownDataAsync();
            return Results.Ok(result);
        }
    }
}
