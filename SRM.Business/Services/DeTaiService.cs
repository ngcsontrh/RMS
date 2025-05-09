﻿using AutoMapper;
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
        private readonly ITacGiaRepository _tacGiaRepository;
        private readonly ILogger<DeTaiService> _logger;

        public DeTaiService(
            IDeTaiRepository deTaiRepository,
            IMapper mapper,
            ICapDeTaiRepository capDeTaiRepository,
            IDonViChuTriRepository donViChuTriRepository,
            ITacGiaRepository tacGiaRepository,
            ILogger<DeTaiService> logger
            )
        {
            _deTaiRepository = deTaiRepository;
            _mapper = mapper;
            _donViRepository = capDeTaiRepository;
            _donViChuTriRepository = donViChuTriRepository;
            _tacGiaRepository = tacGiaRepository;
            _logger = logger;
        }

        public async Task<ExecuteData> AddAsync(DeTaiData model)
        {
            try
            {   
                await _deTaiRepository.BeginTransactionAsync();

                var capDeTai = await _donViRepository.GetByTenAsync(model.TenCapDeTai!);
                if (capDeTai == null)
                {
                    capDeTai = new CapDeTai { Ten = model.TenCapDeTai! };
                    await _donViRepository.AddAsync(capDeTai);
                }
                model.CapDeTaiId = capDeTai.Id;

                if (model.TenDonViChuTri != null)
                {
                    var donViChuTri = await _donViChuTriRepository.GetByTenAsync(model.TenDonViChuTri);
                    if (donViChuTri == null)
                    {
                        donViChuTri = new DonViChuTri { Ten = model.TenDonViChuTri };
                        await _donViChuTriRepository.AddAsync(donViChuTri);
                    }
                    model.DonViChuTriId = donViChuTri.Id;
                }

                var deTai = _mapper.Map<DeTai>(model);
                await _deTaiRepository.AddAsync(deTai);
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
                if (model.CapDeTaiId == null)
                {
                    var capDeTai = new CapDeTai { Ten = model.TenCapDeTai! };
                    await _donViRepository.AddAsync(capDeTai);
                    model.CapDeTaiId = capDeTai.Id;
                }

                if (model.DonViChuTriId == null)
                {
                    var donViChuTri = new DonViChuTri { Ten = model.TenDonViChuTri! };
                    await _donViChuTriRepository.AddAsync(donViChuTri);
                    model.DonViChuTriId = donViChuTri.Id;
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
