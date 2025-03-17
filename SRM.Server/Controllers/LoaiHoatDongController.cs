using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Server.Attributes;
using SRM.Shared.Enums;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using SRM.Shared.Utils;

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
        public async Task<ExecuteData> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
        )
        {
            var search = new LoaiHoatDongSearch();
            var result = await _loaiHoatDongService.GetPageAsync(search, pageIndex, pageSize);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ExecuteData> GetAsync(int id)
        {
            var result = await _loaiHoatDongService.GetAsync(id);
            return result;
        }

        [HttpPost]
        [Authorize]
        [Permission(nameof(Permission.AddLoaiHoatDong))]
        public async Task<ExecuteData> AddAsync([FromBody] LoaiHoatDongData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            var result = await _loaiHoatDongService.AddAsync(model);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        [Permission(nameof(Permission.UpdateLoaiHoatDong))]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] LoaiHoatDongData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            model.Id = id;
            var result = await _loaiHoatDongService.UpdateAsync(model);
            return result;
        }
    }
}
