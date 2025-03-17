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
    [Route("api/thanh-qua")]
    [ApiController]
    public class ThanhQuaController : ControllerBase
    {
        private readonly IThanhQuaService _thanhQuaService;
        private readonly IValidator<ThanhQuaData> _validator;

        public ThanhQuaController(
            IThanhQuaService thanhQuaService,
            IValidator<ThanhQuaData> validator
            )
        {
            _thanhQuaService = thanhQuaService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<ExecuteData> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var result = await _thanhQuaService.GetPageAsync(pageIndex, pageSize);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ExecuteData> GetAsync(int id)
        {
            var result = await _thanhQuaService.GetAsync(id);
            return result;
        }

        [HttpPost]
        [Authorize]
        [Permission(nameof(Permission.AddThanhQua))]
        public async Task<ExecuteData> AddAsync([FromBody] ThanhQuaData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            var result = await _thanhQuaService.AddAsync(model);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        [Permission(nameof(Permission.UpdateThanhQua))]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] ThanhQuaData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            model.Id = id;
            var result = await _thanhQuaService.UpdateAsync(model);
            return result;
        }
    }
}
