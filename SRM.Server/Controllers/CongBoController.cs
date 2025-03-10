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
    [Route("api/cong-bo")]
    [ApiController]
    public class CongBoController : ControllerBase
    {
        private readonly ICongBoService _congBoService;
        private readonly IValidator<CongBoData> _validator;

        public CongBoController(ICongBoService congBoService, IValidator<CongBoData> validator)
        {
            _congBoService = congBoService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IResult> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var search = new CongBoSearch();
            var result = await _congBoService.GetPageAsync(search, pageIndex, pageSize);
            return Results.Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetAsync(int id)
        {
            var result = await _congBoService.GetAsync(id);
            if (result == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(result);
        }

        [HttpPost]
        public async Task<IResult> AddAsync([FromBody] CongBoData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return Results.ValidationProblem(ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
                ));
            }

            var result = await _congBoService.AddAsync(model);           
            return Results.Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdateAsync(int id, [FromBody] CongBoData model)
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
            var result = await _congBoService.UpdateAsync(model);            
            return Results.Ok(result);
        }
    }
}
