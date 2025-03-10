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
    public class NoiDangBaoService : INoiDangBaoService
    {
        private readonly INoiDangBaoRepository _noiDangBaoRepository;
        private readonly ILogger<NoiDangBaoService> _logger;
        private readonly IMapper _mapper;

        public NoiDangBaoService(
            INoiDangBaoRepository noiDangBaoRepository,
            ILogger<NoiDangBaoService> logger,
            IMapper mapper
            )
        {
            _noiDangBaoRepository = noiDangBaoRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<bool> AddAsync(NoiDangBaoData model)
        {
            try
            {
                var entity = _mapper.Map<NoiDangBao>(model);
                await _noiDangBaoRepository.AddAsync(entity);
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
                await _noiDangBaoRepository.DeleteAsync(id);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<NoiDangBaoData?> GetAsync(int id)
        {
            try
            {
                var entity = await _noiDangBaoRepository.GetByIdAsync(id);
                var result = _mapper.Map<NoiDangBaoData?>(entity);
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<PageData<NoiDangBaoData>> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _noiDangBaoRepository.GetPageWithFilterAsync(_noiDangBaoRepository.GetQueryable(), pageIndex, pageSize);
                return new PageData<NoiDangBaoData>
                {
                    Data = _mapper.Map<List<NoiDangBaoData>>(result.Item1),
                    Total = result.Item2
                };
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(NoiDangBaoData model)
        {
            try
            {
                var entity = _mapper.Map<NoiDangBao>(model);
                await _noiDangBaoRepository.UpdateAsync(entity);
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
