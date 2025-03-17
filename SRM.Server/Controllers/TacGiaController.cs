using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OneOf.Types;
using SRM.Business.IServices;
using SRM.Server.Attributes;
using SRM.Shared.Enums;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using SRM.Shared.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SRM.Server.Controllers
{
    [Route("api/tac-gia")]
    [ApiController]
    public class TacGiaController : ControllerBase
    {
        private readonly ITacGiaService _tacGiaService;
        private readonly IValidator<TacGiaData> _validator;

        public TacGiaController(ITacGiaService tacGiaService, IValidator<TacGiaData> validator)
        {
            _tacGiaService = tacGiaService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<ExecuteData> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var search = new CongBoSearch();
            var result = await _tacGiaService.GetPageAsync(pageIndex, pageSize);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ExecuteData> GetAsync(int id)
        {
            var result = await _tacGiaService.GetAsync(id);
            return result;
        }

        [HttpPost]
        [Authorize]
        [Permission(nameof(Permission.AddTacGia))]
        public async Task<ExecuteData> AddAsync([FromBody] TacGiaData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            var result = await _tacGiaService.AddAsync(model);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        [Permission(nameof(Permission.UpdateTacGia))]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] TacGiaData model)
        {
            var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }

            model.Id = id;
            var result = await _tacGiaService.UpdateAsync(model);
            return result;
        }

        [HttpGet("dropdown-data")]
        public async Task<ExecuteData> GetDropDownDataAsync()
        {
            var result = await _tacGiaService.GetDropDownDataAsync();
            return result;
        }
    }
}
