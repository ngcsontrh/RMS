using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OneOf.Types;
using SRM.Business.IServices;

using SRM.Shared.Enums;
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

        #region public
        [HttpGet]
        public async Task<ExecuteData> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] int? userId = null
            )
        {
            var search = new CongBoSearch
            {
                UserId = userId,
            };
            var result = await _congBoService.GetPageAsync(search, pageIndex, pageSize);
            return result;
        }
        #endregion

        #region authorize
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ExecuteData> GetAsync(int id)
        {
            var result = await _congBoService.GetAsync(id);
            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<ExecuteData> AddAsync([FromBody] CongBoData model)
        {
             var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }
            var result = await _congBoService.AddAsync(model);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] CongBoData model)
        {
             var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }
            model.Id = id;
            var result = await _congBoService.UpdateAsync(model);            
            return result;
        }

        #endregion
    }
}
