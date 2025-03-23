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
    public class NoiDangBaoService : INoiDangBaoService
    {
        private readonly INoiDangBaoRepository _noiDangBaoRepository;
        private readonly ILogger<NoiDangBaoService> _logger;
        private readonly IMapper _mapper;

        public NoiDangBaoService(
            INoiDangBaoRepository noiDangBaoRepository,
            ILogger<NoiDangBaoService> logger,
            IMapper mapper
            )
        {
            _noiDangBaoRepository = noiDangBaoRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ExecuteData> AddAsync(NoiDangBaoData model)
        {
            try
            {
                var entity = _mapper.Map<NoiDangBao>(model);
                await _noiDangBaoRepository.AddAsync(entity);
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
                await _noiDangBaoRepository.DeleteAsync(id);
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
                var entity = await _noiDangBaoRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.NotFound,
                    };
                }
                var result = _mapper.Map<NoiDangBaoData?>(entity);
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.GeneralError,
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
                var result = await _noiDangBaoRepository.GetPageWithFilterAsync(_noiDangBaoRepository.GetQueryable(), pageIndex, pageSize);
                var pageData = new PageData<NoiDangBaoData>
                {
                    Items = _mapper.Map<List<NoiDangBaoData>>(result.Item1),
                    Total = result.Item2
                };
                return new ExecuteData
                {
                    Success = true,
                    Data = pageData,
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

        public async Task<ExecuteData> UpdateAsync(NoiDangBaoData model)
        {
            try
            {
                var entity = _mapper.Map<NoiDangBao>(model);
                await _noiDangBaoRepository.UpdateAsync(entity);
                return new ExecuteData { Success = true, Message = GlobalConstraint.Success };
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
                var entities = await _noiDangBaoRepository.GetAllAsync();
                var result = _mapper.Map<List<NoiDangBaoData>>(entities);
                return new ExecuteData { Success = true, Data = result, Message = GlobalConstraint.Success };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData { Success = false, Message = GlobalConstraint.GeneralError };
            }
        }
      
    }
}
