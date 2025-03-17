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
    public class DonViChuTriService : IDonViChuTriService
    {
        private readonly IDonViChuTriRepository _donViChuTriRepository;
        private readonly ILogger<DonViChuTriService> _logger;
        private readonly IMapper _mapper;

        public DonViChuTriService(
            IDonViChuTriRepository donViChuTriRepository,
            ILogger<DonViChuTriService> logger,
            IMapper mapper
            )
        {
            _donViChuTriRepository = donViChuTriRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ExecuteData> AddAsync(DonViChuTriData model)
        {
            try
            {
                var entity = _mapper.Map<DonViChuTri>(model);
                await _donViChuTriRepository.AddAsync(entity);
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
                var entity = await _donViChuTriRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.NotFound,
                    };
                }

                var result = _mapper.Map<DonViChuTriData?>(entity);
                return new ExecuteData
                {
                    Success = true,
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
                var result = await _donViChuTriRepository.GetPageWithFilterAsync(_donViChuTriRepository.GetQueryable(), pageIndex, pageSize);
                var pageData = new PageData<DonViChuTriData>
                {
                    Items = _mapper.Map<List<DonViChuTriData>>(result.Item1),
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
                    Success = true,
                    Message = GlobalConstraint.GeneralError,
                };
            }
        }

        public async Task<ExecuteData> UpdateAsync(DonViChuTriData model)
        {
            try
            {
                var entity = _mapper.Map<DonViChuTri>(model);
                await _donViChuTriRepository.UpdateAsync(entity);
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
