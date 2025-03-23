using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using SRM.Shared.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class DeTaiService : IDeTaiService
    {
        private readonly IDeTaiRepository _deTaiRepository;
        private readonly IMapper _mapper;
        private readonly ICapDeTaiRepository _donViRepository;
        private readonly IDonViChuTriRepository _donViChuTriRepository;
        private readonly ILogger<DeTaiService> _logger;

        public DeTaiService(
            IDeTaiRepository deTaiRepository,
            IMapper mapper,
            ICapDeTaiRepository capDeTaiRepository,
            IDonViChuTriRepository donViChuTriRepository,
            ILogger<DeTaiService> logger
            )
        {
            _deTaiRepository = deTaiRepository;
            _mapper = mapper;
            _donViRepository = capDeTaiRepository;
            _donViChuTriRepository = donViChuTriRepository;
            _logger = logger;
        }

        public async Task<ExecuteData> AddAsync(DeTaiData model)
        {
            try
            {   
                var deTai = _mapper.Map<DeTai>(model);
                await _deTaiRepository.AddAsync(deTai);
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
                var entity = await _deTaiRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.NotFound,
                    };
                }
                var result = _mapper.Map<DeTaiData>(entity);
                return new ExecuteData
                {
                    Success = true,
                    Data = result,
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

        public async Task<ExecuteData> GetPageAsync(DeTaiSearch searchModel, int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _deTaiRepository.GetPageWithSearchAsync(searchModel);
                var pageData = new PageData<DeTaiData>
                {
                    Items = _mapper.Map<List<DeTaiData>>(result.Item1),
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

        public async Task<ExecuteData> UpdateAsync(DeTaiData model)
        {
            try
            {
                await _deTaiRepository.BeginTransactionAsync();
                if (!string.IsNullOrEmpty(model.HoSoNghiemThu))
                {
                    model.HoSoNghiemThu = FileHelper.SaveBase64File(model.HoSoNghiemThu, "HoSoNghiemThu");
                }
                if (!string.IsNullOrEmpty(model.HoSoSanPham))
                {
                    model.HoSoSanPham = FileHelper.SaveBase64File(model.HoSoSanPham, "HoSoSanPham");
                }
                var deTai = _mapper.Map<DeTai>(model);
                await _deTaiRepository.UpdateAsync(deTai);
                await _deTaiRepository.CommitTransactionAsync();
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                };
            }
            catch (Exception e)
            {
                await _deTaiRepository.RollbackTransactionAsync();
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
