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
    [Route("api/de-tai")]
    [ApiController]
    public class DeTaiController : ControllerBase
    {
        private readonly IDeTaiService _deTaiService;
        private readonly IValidator<DeTaiData> _validator;

        public DeTaiController(IDeTaiService deTaiService, IValidator<DeTaiData> validator)
        {
            _deTaiService = deTaiService;
            _validator = validator;
        }

        #region public
        [HttpGet]
        public async Task<ExecuteData> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] int? tacGiaId = null
            )
        {
            var search = new DeTaiSearch(tacGiaId);
            var result = await _deTaiService.GetPageAsync(search, pageIndex, pageSize);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ExecuteData> GetAsync(int id)
        {
            var result = await _deTaiService.GetAsync(id);
            return result;
        }
        #endregion

        [HttpPost]
        [Authorize]
        public async Task<ExecuteData> AddAsync([FromBody] DeTaiData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.InvalidData,
                };
            }
            var result = await _deTaiService.AddAsync(model);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] DeTaiData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            model.Id = id;
            var result = await _deTaiService.UpdateAsync(model);
            return result;
        }
    }
}
