using AutoMapper;
using Microsoft.Extensions.Logging;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Data.Repositories;
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
    public class TacGiaService : ITacGiaService
    {
        private readonly ITacGiaRepository _tacGiaRepository;
        private readonly ILogger<TacGiaService> _logger;
        private readonly IMapper _mapper;

        public TacGiaService(
            ITacGiaRepository tacGiaRepository,
            ILogger<TacGiaService> logger,
            IMapper mapper
            )
        {
            _tacGiaRepository = tacGiaRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ExecuteData> AddAsync(TacGiaData model)
        {
            try
            {
                var entity = _mapper.Map<TacGia>(model);
                await _tacGiaRepository.AddAsync(entity);
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
                await _tacGiaRepository.DeleteAsync(id);
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
                var entity = await _tacGiaRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.NotFound,
                    };
                }
                var result = _mapper.Map<TacGiaData?>(entity);
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

        public async Task<ExecuteData> GetDropDownDataAsync()
        {
            try
            {
                var entities = await _tacGiaRepository.GetDropDownDataAsync();
                var result = _mapper.Map<List<TacGiaData>>(entities);
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
                var result = await _tacGiaRepository.GetPageWithFilterAsync(_tacGiaRepository.GetQueryable(), pageIndex, pageSize);
                var pageData = new PageData<TacGiaData>
                {
                    Items = _mapper.Map<List<TacGiaData>>(result.Item1),
                    Total = result.Item2
                };
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                    Data = pageData,
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

        public async Task<ExecuteData> UpdateAsync(TacGiaData model)
        {
            try
            {
                var entity = _mapper.Map<TacGia>(model);
                await _tacGiaRepository.UpdateAsync(entity);
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
