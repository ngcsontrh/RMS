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
    public class DonViService : IDonViService
    {
        private readonly IDonViRepository _donViRepository;
        private readonly ILogger<DonViService> _logger;
        private readonly IMapper _mapper;

        public DonViService(
            IDonViRepository donViRepository,
            ILogger<DonViService> logger,
            IMapper mapper
            )
        {
            _donViRepository = donViRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ExecuteData> AddAsync(DonViData model)
        {
            try
            {
                var entity = _mapper.Map<DonVi>(model);
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
                var entity = await _donViRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ExecuteData { Success = false, Message = GlobalConstraint.NotFound };
                }
                var result = _mapper.Map<DonViData?>(entity);
                return new ExecuteData { Success = true, Message = GlobalConstraint.Success, Data = result };
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
                var result = await _donViRepository.GetAllAsync();
                return new ExecuteData
                {
                    Success = true,
                    Data = _mapper.Map<List<DonViData>>(result),
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
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
                var pageData = new PageData<DonViData>
                {
                    Items = _mapper.Map<List<DonViData>>(result.Item1),
                    Total = result.Item2
                };
                return new ExecuteData { Success = true, Message = GlobalConstraint.Success, Data = pageData };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new ExecuteData { Success = false, Message = GlobalConstraint.GeneralError };
            }
        }

        public async Task<ExecuteData> UpdateAsync(DonViData model)
        {
            try
            {
                var entity = _mapper.Map<DonVi>(model);
                await _donViRepository.UpdateAsync(entity);
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
