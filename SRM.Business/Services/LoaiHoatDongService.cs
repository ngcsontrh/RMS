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
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class LoaiHoatDongService : ILoaiHoatDongService
    {
        private readonly ILoaiHoatDongRepository _loaiHoatDongRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<LoaiHoatDongService> _logger;

        public LoaiHoatDongService(
            ILoaiHoatDongRepository loaiHoatDongRepository,
            IMapper mapper,
            ILogger<LoaiHoatDongService> logger
        )
        {
            _loaiHoatDongRepository = loaiHoatDongRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<bool> AddAsync(LoaiHoatDongData model)
        {
            try
            {
                await _loaiHoatDongRepository.BeginTransactionAsync();

                var loaiHoatDong = _mapper.Map<LoaiHoatDong>(model);
                await _loaiHoatDongRepository.AddAsync(loaiHoatDong);
                await _loaiHoatDongRepository.CommitTransactionAsync();
                return true;
            }
            catch (Exception e)
            {
                await _loaiHoatDongRepository.RollbackTransactionAsync();
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<LoaiHoatDongData?> GetAsync(int id)
        {
            try
            {
                var entity = await _loaiHoatDongRepository.GetByIdAsync(id);
                return entity == null ? null : _mapper.Map<LoaiHoatDongData>(entity);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<PageData<LoaiHoatDongData>> GetPageAsync(LoaiHoatDongSearch searchModel, int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _loaiHoatDongRepository.GetPageWithSearchAsync(searchModel);
                return new PageData<LoaiHoatDongData>
                {
                    Data = _mapper.Map<List<LoaiHoatDongData>>(result.Item1),
                    Total = result.Item2
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(LoaiHoatDongData model)
        {
            try
            {
                await _loaiHoatDongRepository.BeginTransactionAsync();

                var loaiHoatDong = _mapper.Map<LoaiHoatDong>(model);
                await _loaiHoatDongRepository.UpdateAsync(loaiHoatDong);
                await _loaiHoatDongRepository.CommitTransactionAsync();
                return true;
            }
            catch (Exception e)
            {
                await _loaiHoatDongRepository.RollbackTransactionAsync();
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                await _loaiHoatDongRepository.BeginTransactionAsync();
                await _loaiHoatDongRepository.DeleteAsync(id);
                await _loaiHoatDongRepository.CommitTransactionAsync();
                return true;
            }
            catch (Exception e)
            {
                await _loaiHoatDongRepository.RollbackTransactionAsync();
                _logger.LogError(e.Message);
                throw;
            }
        }
    }
}
