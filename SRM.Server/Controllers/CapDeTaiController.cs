﻿using FluentValidation;
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
    [Route("api/cap-de-tai")]
    [ApiController]
    public class CapDeTaiController : ControllerBase
    {
        private readonly ICapDeTaiService _capDeTaiService;
        private readonly IValidator<CapDeTaiData> _validator;

        public CapDeTaiController(
            ICapDeTaiService capDeTaiService,
            IValidator<CapDeTaiData> validator
            )
        {
            _capDeTaiService = capDeTaiService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<ExecuteData> GetAsync(
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10
            )
        {
            var result = await _capDeTaiService.GetPageAsync(pageIndex, pageSize);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ExecuteData> GetAsync(int id)
        {
            var result = await _capDeTaiService.GetAsync(id);
            return result;
        }

        [HttpPost]
        [Authorize]
        [Permission(nameof(Permission.AddCapDeTai))]
        public async Task<ExecuteData> AddAsync([FromBody] CapDeTaiData model)
        {
             var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }
            var result = await _capDeTaiService.AddAsync(model);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        [Permission(nameof(Permission.UpdateCapDeTai))]
        public async Task<ExecuteData> UpdateAsync(int id, [FromBody] CapDeTaiData model)
        {
             var validateResult = await _validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return new ExecuteData { Success = false, Message = GlobalConstraint.InvalidData };
            }
            model.Id = id;
            var result = await _capDeTaiService.UpdateAsync(model);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ExecuteData> DeleteAsync(int id)
        {
            var result = await _capDeTaiService.DeleteAsync(id);
            return result;
        }
    }
}
