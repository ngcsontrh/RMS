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

        public async Task<bool> AddAsync(DonViData model)
        {
            try
            {
                var entity = _mapper.Map<DonVi>(model);
                await _donViRepository.AddAsync(entity);
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
                await _donViRepository.DeleteAsync(id);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<DonViData?> GetAsync(int id)
        {
            try
            {
                var entity = await _donViRepository.GetByIdAsync(id);
                var result = _mapper.Map<DonViData?>(entity);
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<PageData<DonViData>> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _donViRepository.GetPageWithFilterAsync(_donViRepository.GetQueryable(), pageIndex, pageSize);
                return new PageData<DonViData>
                {
                    Data = _mapper.Map<List<DonViData>>(result.Item1),
                    Total = result.Item2
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(DonViData model)
        {
            try
            {
                var entity = _mapper.Map<DonVi>(model);
                await _donViRepository.UpdateAsync(entity);
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
