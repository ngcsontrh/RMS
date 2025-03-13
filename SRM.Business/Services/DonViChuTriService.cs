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

        public async Task AddAsync(DonViChuTriData model)
        {
            try
            {
                var entity = _mapper.Map<DonViChuTri>(model);
                await _donViChuTriRepository.AddAsync(entity);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

		public Task DeleteAsync(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<DonViChuTriData?> GetAsync(int id)
        {
            try
            {
                var entity = await _donViChuTriRepository.GetByIdAsync(id);
                var result = _mapper.Map<DonViChuTriData?>(entity);
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<PageData<DonViChuTriData>> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _donViChuTriRepository.GetPageWithFilterAsync(_donViChuTriRepository.GetQueryable(), pageIndex, pageSize);
                return new PageData<DonViChuTriData>
                {
                    Data = _mapper.Map<List<DonViChuTriData>>(result.Item1),
                    Total = result.Item2
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task UpdateAsync(DonViChuTriData model)
        {
            try
            {
                var entity = _mapper.Map<DonViChuTri>(model);
                await _donViChuTriRepository.UpdateAsync(entity);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }
    }
}
