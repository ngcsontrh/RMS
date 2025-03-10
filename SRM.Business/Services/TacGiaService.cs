using AutoMapper;
using Microsoft.Extensions.Logging;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Data.Repositories;
using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
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

        public async Task AddAsync(TacGiaData model)
        {
            try
            {
                var entity = _mapper.Map<TacGia>(model);
                await _tacGiaRepository.AddAsync(entity);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                await _tacGiaRepository.DeleteAsync(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<TacGiaData?> GetAsync(int id)
        {
            try
            {
                var entity = await _tacGiaRepository.GetByIdAsync(id);
                var result = _mapper.Map<TacGiaData?>(entity);
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<List<TacGiaData>> GetDropDownDataAsync()
        {
            try
            {
                var entities = await _tacGiaRepository.GetDropDownDataAsync();
                var result = _mapper.Map<List<TacGiaData>>(entities);
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<PageData<TacGiaData>> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _tacGiaRepository.GetPageWithFilterAsync(_tacGiaRepository.GetQueryable(), pageIndex, pageSize);
                return new PageData<TacGiaData>
                {
                    Data = _mapper.Map<List<TacGiaData>>(result.Item1),
                    Total = result.Item2
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task UpdateAsync(TacGiaData model)
        {
            try
            {
                var entity = _mapper.Map<TacGia>(model);
                await _tacGiaRepository.UpdateAsync(entity);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }
    }
}
