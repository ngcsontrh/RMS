using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OneOf;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Exceptions;
using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using SRM.Shared.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class CongBoService : ICongBoService
    {
        private readonly ICongBoRepository _congBoRepository;
        private readonly INoiDangBaoRepository _noiDangBaoRepository;
        private readonly IThanhQuaRepository _thanhquaRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CongBoService> _logger;

        public CongBoService(
            ICongBoRepository congBoRepository,
            INoiDangBaoRepository noiDangBaoRepository,
            IThanhQuaRepository thanhquaRepository,            
            IMapper mapper,
            ILogger<CongBoService> logger
            )
        {
            _congBoRepository = congBoRepository;
            _noiDangBaoRepository = noiDangBaoRepository;
            _thanhquaRepository = thanhquaRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ExecuteData> AddAsync(CongBoData model)
        {
            try
            {
                await _congBoRepository.BeginTransactionAsync();
                if (!model.NoiDangBaoId.HasValue && !string.IsNullOrEmpty(model.TenNoiDangBao))
                {
                    var noiDangBao = new NoiDangBao { Ten = model.TenNoiDangBao };
                    await _noiDangBaoRepository.AddAsync(noiDangBao);
                    model.NoiDangBaoId = noiDangBao.Id;
                }
                if (!model.ThanhQuaId.HasValue && !string.IsNullOrEmpty(model.TenThanhQua))
                {
                    var thanhQua = new ThanhQua { Ten = model.TenThanhQua };
                    await _thanhquaRepository.AddAsync(thanhQua);
                    model.ThanhQuaId = thanhQua.Id;
                }

                var congBo = _mapper.Map<CongBo>(model);
                await _congBoRepository.AddAsync(congBo);
                await _congBoRepository.CommitTransactionAsync();
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                };
            }
            catch (Exception e)
            {
                await _congBoRepository.RollbackTransactionAsync();
                _logger.LogError(e.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError,
                };
            }
        }

        public async Task<ExecuteData> UpdateAsync(CongBoData model)
        {
            try
            {               
                await _congBoRepository.BeginTransactionAsync();

                if (!model.NoiDangBaoId.HasValue && !string.IsNullOrEmpty(model.TenNoiDangBao))
                {
                    var noiDangBao = new NoiDangBao { Ten = model.TenNoiDangBao };
                    await _noiDangBaoRepository.AddAsync(noiDangBao);
                    model.NoiDangBaoId = noiDangBao.Id;
                }
                if (!model.ThanhQuaId.HasValue && !string.IsNullOrEmpty(model.TenThanhQua))
                {
                    var thanhQua = new ThanhQua { Ten = model.TenThanhQua };
                    await _thanhquaRepository.AddAsync(thanhQua);
                    model.ThanhQuaId = thanhQua.Id;
                }

                var congBo = _mapper.Map<CongBo>(model);

                await _congBoRepository.UpdateAsync(congBo);
                await _congBoRepository.CommitTransactionAsync();
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                };
            }
            catch (Exception e)
            {
                await _congBoRepository.RollbackTransactionAsync();
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
                var entity = await _congBoRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.NotFound,
                    };
                }

                var result = _mapper.Map<CongBoData>(entity);
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

        public async Task<ExecuteData> GetPageAsync(CongBoSearch searchModel, int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _congBoRepository.GetPageWithSearchAsync(searchModel, pageIndex, pageSize);
                var pageData = new PageData<CongBoData>
                {
                    Items = _mapper.Map<List<CongBoData>>(result.Item1),
                    Total = result.Item2,
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
    }
}
