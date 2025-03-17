using AutoMapper;
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
    public class HoatDongService : IHoatDongService
    {
        private readonly IHoatDongRepository _hoatDongRepository;
        private readonly ILoaiHoatDongRepository _loaiHoatDongRepository;
        private readonly ILogger<HoatDongService> _logger;
        private readonly IMapper _mapper;

        public HoatDongService(
            IHoatDongRepository hoatDongRepository, 
            ILogger<HoatDongService> logger, 
            ILoaiHoatDongRepository loaiHoatDongRepository,
            IMapper mapper
            )
        {
            _hoatDongRepository = hoatDongRepository;
            _logger = logger;
            _loaiHoatDongRepository = loaiHoatDongRepository;
            _mapper = mapper;
        }

        public async Task<ExecuteData> AddAsync(HoatDongData model)
        {
            try
            {
                var hoatDong = _mapper.Map<HoatDong>(model);
                await _hoatDongRepository.BeginTransactionAsync();
                if (model.TenLoaiHoatDong != null)
                {
                    var loaiHoatDong = await _loaiHoatDongRepository.GetByTenAsync(model.TenLoaiHoatDong);
                    if (loaiHoatDong == null)
                    {
                        loaiHoatDong = new Shared.Entities.LoaiHoatDong { Ten = model.TenLoaiHoatDong };
                        await _loaiHoatDongRepository.AddAsync(loaiHoatDong);
                    }
                    hoatDong.LoaiHoatDongId = loaiHoatDong.Id;
                }
                await _hoatDongRepository.AddAsync(hoatDong);
                await _hoatDongRepository.CommitTransactionAsync();
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                };
            }
            catch (Exception e)
            {
                await _hoatDongRepository.RollbackTransactionAsync();
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
                var entity = await _hoatDongRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.NotFound,
                    };
                }

                var result = _mapper.Map<HoatDongData>(entity);
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

        public async Task<ExecuteData> GetPageAsync(HoatDongSearch searchModel, int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _loaiHoatDongRepository.GetPageWithFilterAsync(_loaiHoatDongRepository.GetQueryable());
                var pageData = new PageData<HoatDongData>
                {
                    Items = _mapper.Map<List<HoatDongData>>(result.Item1),
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

        public async Task<ExecuteData> UpdateAsync(HoatDongData model)
        {
            try
            {
                var hoatDong = _mapper.Map<HoatDong>(model);
                await _hoatDongRepository.BeginTransactionAsync();
                if (model.TenLoaiHoatDong != null)
                {
                    var loaiHoatDong = await _loaiHoatDongRepository.GetByTenAsync(model.TenLoaiHoatDong);
                    if (loaiHoatDong == null)
                    {
                        loaiHoatDong = new Shared.Entities.LoaiHoatDong { Ten = model.TenLoaiHoatDong };
                        await _loaiHoatDongRepository.AddAsync(loaiHoatDong);
                    }
                    hoatDong.LoaiHoatDongId = loaiHoatDong.Id;
                }
                await _hoatDongRepository.UpdateAsync(hoatDong);
                await _hoatDongRepository.CommitTransactionAsync();
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.Success,
                };
            }
            catch (Exception e)
            {
                await _hoatDongRepository.RollbackTransactionAsync();
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
