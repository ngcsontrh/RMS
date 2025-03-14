using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;

namespace SRM.Server.Controllers
{
    [Route("api/loai-hoat-dong")]
    [ApiController]
    public class LoaiHoatDongController : ControllerBase
    {
        private readonly ILoaiHoatDongService _loaiHoatDongService;
        private readonly IValidator<LoaiHoatDongData> _validator;

        public LoaiHoatDongController(ILoaiHoatDongService loaiHoatDongService, IValidator<LoaiHoatDongData> validator)
        {
            _loaiHoatDongService = loaiHoatDongService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IResult> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
        )
        {
            var search = new LoaiHoatDongSearch();
            var result = await _loaiHoatDongService.GetPageAsync(search, pageIndex, pageSize);
            return Results.Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetAsync(int id)
        {
            var result = await _loaiHoatDongService.GetAsync(id);
            if (result == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(result);
        }

        [HttpPost]
        public async Task<IResult> AddAsync([FromBody] LoaiHoatDongData model)
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

            var result = await _loaiHoatDongService.AddAsync(model);
            return Results.Created();
        }

        [HttpPut("{id}")]
        public async Task<IResult> UpdateAsync(int id, [FromBody] LoaiHoatDongData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                var errors = validateResult.Errors.Select(x => x.ErrorMessage).ToList();
                return Results.BadRequest(errors);
            }

            model.Id = id;
            var result = await _loaiHoatDongService.UpdateAsync(model);
            return Results.NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IResult> DeleteAsync(int id)
        {
            var result = await _loaiHoatDongService.DeleteAsync(id);
            return result ? Results.NoContent() : Results.NotFound();
        }
    }
}
