using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Business.Services;
using SRM.Server.Attributes;
using SRM.Shared.Enums;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using SRM.Shared.Utils;

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
        public async Task<ExecuteData> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var result = await _noiDangBaoService.GetPageAsync(pageIndex, pageSize);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ExecuteData> GetAsync(int id)
        {
            var result = await _noiDangBaoService.GetAsync(id);
            return result;
        }

        [HttpPost]
        [Authorize]
        [Permission(nameof(Permission.AddNoiDangBao))]
        public async Task<ExecuteData> AddAsync([FromBody] NoiDangBaoData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            var result = await _noiDangBaoService.AddAsync(model);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        [Permission(nameof(Permission.UpdateNoiDangBao))]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] NoiDangBaoData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            model.Id = id;
            var result = await _noiDangBaoService.UpdateAsync(model);
            return result;
        }

        [HttpGet("dropdown-data")]
        public async Task<ExecuteData> GetDropDownDataAsync()
        {
            var result = await _noiDangBaoService.GetDropDownDataAsync();
            return result;
        }
    }
}
