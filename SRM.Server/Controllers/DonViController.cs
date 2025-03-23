using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRM.Business.IServices;
using SRM.Business.Services;

using SRM.Shared.Enums;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using SRM.Shared.Utils;

namespace SRM.Server.Controllers
{
    [Route("api/don-vi")]
    [ApiController]
    public class DonViController : ControllerBase
    {
        private readonly IDonViService _donViService;
        private readonly IValidator<DonViData> _validator;

        public DonViController(
            IDonViService donViService,
            IValidator<DonViData> validator
            )
        {
            _donViService = donViService;
            _validator = validator;
        }

        #region public
        [HttpGet("dropdown")]
        public async Task<ExecuteData> GetDropdownAsync()
        {
            var result = await _donViService.GetDropdownAsync();
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
            var result = await _donViService.GetPageAsync(pageIndex, pageSize);
            return result;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ExecuteData> GetAsync(int id)
        {
            var result = await _donViService.GetAsync(id);
            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<ExecuteData> AddAsync([FromBody] DonViData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            var result = await _donViService.AddAsync(model);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] DonViData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            model.Id = id;
            var result = await _donViService.UpdateAsync(model);
            return result;
        }
        #endregion
    }
}
