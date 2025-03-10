using AutoMapper;
using Microsoft.Extensions.Logging;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class ThanhQuaService : IThanhQuaService
    {
        private readonly IThanhQuaRepository _thanhQuaRepository;
        private readonly ILogger<ThanhQuaService> _logger;
        private readonly IMapper _mapper;

        public ThanhQuaService(
            IThanhQuaRepository ThanhQuaRepository,
            ILogger<ThanhQuaService> logger,
            IMapper mapper
            )
        {
            _thanhQuaRepository = ThanhQuaRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<bool> AddAsync(ThanhQuaData model)
        {
            try
            {
                var entity = _mapper.Map<ThanhQua>(model);
                await _thanhQuaRepository.AddAsync(entity);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                await _thanhQuaRepository.DeleteAsync(id);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<ThanhQuaData?> GetAsync(int id)
        {
            try
            {
                var entity = await _thanhQuaRepository.GetByIdAsync(id);
                var result = _mapper.Map<ThanhQuaData?>(entity);
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<PageData<ThanhQuaData>> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _thanhQuaRepository.GetPageWithFilterAsync(_thanhQuaRepository.GetQueryable(), pageIndex, pageSize);
                return new PageData<ThanhQuaData>
                {
                    Data = _mapper.Map<List<ThanhQuaData>>(result.Item1),
                    Total = result.Item2
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(ThanhQuaData model)
        {
            try
            {
                var entity = _mapper.Map<ThanhQua>(model);
                await _thanhQuaRepository.UpdateAsync(entity);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }
    }
}
