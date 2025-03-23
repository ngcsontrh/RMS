using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;

using SRM.Shared.Enums;
using SRM.Shared.Models.Data;
using SRM.Shared.Utils;

namespace SRM.Server.Controllers
{
    [Route("api/don-vi-chu-tri")]
    [ApiController]
    public class DonViChuTriController : ControllerBase
    {        
        private readonly IDonViChuTriService _donViChuTriService;
        private readonly IValidator<DonViChuTriData> _validator;

        public DonViChuTriController(
            IDonViChuTriService donViChuTriService,
            IValidator<DonViChuTriData> validator
            )
        {
            _donViChuTriService = donViChuTriService;
            _validator = validator;
        }

        #region public
        [HttpGet("dropdown")]
        public async Task<ExecuteData> GetDropdownAsync()
        {
            var result = await _donViChuTriService.GetDropdownAsync();
            return result;
        }
        #endregion

        #region authorize
        [HttpGet]
        [Authorize]
        public async Task<ExecuteData> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var result = await _donViChuTriService.GetPageAsync(pageIndex, pageSize);
            return result;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ExecuteData> GetAsync(int id)
        {
            var result = await _donViChuTriService.GetAsync(id);
            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<ExecuteData> AddAsync([FromBody] DonViChuTriData model)
        {             
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }
            var result = await _donViChuTriService.AddAsync(model);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] DonViChuTriData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }
            model.Id = id;
            var result = await _donViChuTriService.UpdateAsync(model);
            return result;
        }
        #endregion
    }
}

