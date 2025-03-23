using AutoMapper;
using Microsoft.Extensions.Logging;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using SRM.Shared.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class ThanhQuaService : IThanhQuaService
    {
        private readonly IThanhQuaRepository _thanhQuaRepository;
        private readonly ILogger<ThanhQuaService> _logger;
        private readonly IMapper _mapper;

        public ThanhQuaService(
            IThanhQuaRepository ThanhQuaRepository,
            ILogger<ThanhQuaService> logger,
            IMapper mapper
            )
        {
            _thanhQuaRepository = ThanhQuaRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ExecuteData> AddAsync(ThanhQuaData model)
        {
            try
            {
                var entity = _mapper.Map<ThanhQua>(model);
                await _thanhQuaRepository.AddAsync(entity);
                return new ExecuteData { Success = true, Message = GlobalConstraint.Success };                    
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData { Success = false, Message = GlobalConstraint.GeneralError };
            }
        }

        public async Task<ExecuteData> DeleteAsync(int id)
        {
            try
            {
                await _thanhQuaRepository.DeleteAsync(id);
                return new ExecuteData { Success = true, Message = GlobalConstraint.Success };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData { Success = false, Message = GlobalConstraint.GeneralError };
            }
        }

        public async Task<ExecuteData> GetAsync(int id)
        {
            try
            {
                var entity = await _thanhQuaRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ExecuteData { Success = false, Message = GlobalConstraint.NotFound };
                }
                var result = _mapper.Map<ThanhQuaData?>(entity);
                return new ExecuteData { Success = true, Data = result, Message = GlobalConstraint.Success };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData { Success = false, Message = GlobalConstraint.GeneralError };
            }
        }

        public async Task<ExecuteData> GetDropdownAsync()
        {
            try
            {
                var result = await _thanhQuaRepository.GetAllAsync();
                return new ExecuteData
                {
                    Success = true,
                    Data = _mapper.Map<List<ThanhQuaData>>(result),
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError
                };
            }
        }

        public async Task<ExecuteData> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _thanhQuaRepository.GetPageWithFilterAsync(_thanhQuaRepository.GetQueryable(), pageIndex, pageSize);
                var pageData = new PageData<ThanhQuaData>
                {
                    Items = _mapper.Map<List<ThanhQuaData>>(result.Item1),
                    Total = result.Item2
                };
                return new ExecuteData { Success = true, Data = pageData, Message = GlobalConstraint.Success };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData { Success = false, Message = GlobalConstraint.GeneralError };
            }
        }

        public async Task<ExecuteData> UpdateAsync(ThanhQuaData model)
        {
            try
            {
                var entity = _mapper.Map<ThanhQua>(model);
                await _thanhQuaRepository.UpdateAsync(entity);
                return new ExecuteData { Success = true, Message = GlobalConstraint.Success };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData { Success = false, Message = GlobalConstraint.GeneralError };
            }
        }
    }
}
