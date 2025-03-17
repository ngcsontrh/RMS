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
    public class CapDeTaiService : ICapDeTaiService
    {
        private readonly ICapDeTaiRepository _donViRepository;
        private readonly ILogger<CapDeTaiService> _logger;
        private readonly IMapper _mapper;

        public CapDeTaiService(
            ICapDeTaiRepository capDeTaiRepository, 
            ILogger<CapDeTaiService> logger,
            IMapper mapper
            )
        {
            _donViRepository = capDeTaiRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ExecuteData> AddAsync(CapDeTaiData model)
        {
            try
            {
                var entity = _mapper.Map<CapDeTai>(model);
                await _donViRepository.AddAsync(entity);
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError,
                };
            }
        }

        public async Task<ExecuteData> DeleteAsync(int id)
        {
            try
            {
                await _donViRepository.DeleteAsync(id);
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError,
                };
            }
        }

        public async Task<ExecuteData> GetAsync(int id)
        {
            try
            {
                var entity = await _donViRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.NotFound,
                    };
                }

                var result = _mapper.Map<CapDeTaiData>(entity);
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                    Data = result,
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError,
                };
            }
        }

        public async Task<ExecuteData> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _donViRepository.GetPageWithFilterAsync(_donViRepository.GetQueryable(), pageIndex, pageSize);
                var pageResult = new PageData<CapDeTaiData>
                {
                    Items = _mapper.Map<List<CapDeTaiData>>(result.Item1),
                    Total = result.Item2
                };
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                    Data = pageResult,
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError,
                };
            }
        }

        public async Task<ExecuteData> UpdateAsync(CapDeTaiData model)
        {
            try
            {
                var entity = _mapper.Map<CapDeTai>(model);
                await _donViRepository.UpdateAsync(entity);
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError,
                };
            }
        }
    }
}
