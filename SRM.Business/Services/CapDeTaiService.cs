using Microsoft.Extensions.Logging;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Domain.Data;
using SRM.Domain.Mappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class CapDeTaiService : ICapDeTaiService
    {
        private readonly ICapDeTaiRepository _capDeTaiRepository;
        private readonly ILogger<CapDeTaiService> _logger;

        public CapDeTaiService(ICapDeTaiRepository capDeTaiRepository, ILogger<CapDeTaiService> logger)
        {
            _capDeTaiRepository = capDeTaiRepository;
            _logger = logger;
        }

        public async Task<bool> AddAsync(CapDeTaiData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _capDeTaiRepository.AddAndSaveAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding CapDeTai");
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                await _capDeTaiRepository.ExecuteDeleteAsync(id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting CapDeTai with ID: {Id}", id);
                return false;
            }
        }

        public async Task<(bool, CapDeTaiData?)> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _capDeTaiRepository.GetByIdAsync(id);
                return (true, entity?.MapToData());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving CapDeTai with ID: {Id}", id);
                return (false, null);
            }
        }

        public async Task<(bool, List<CapDeTaiData>?)> GetListAsync()
        {
            try
            {
                var entities = await _capDeTaiRepository.GetListAsync();
                var data = entities.Select(e => e.MapToData()).ToList();
                return (true, data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving list of CapDeTai");
                return (false, null);
            }
        }

        public async Task<(bool, PageData<CapDeTaiData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var entityResult = await _capDeTaiRepository.GetPageAsync(e => true, pageIndex, pageSize);
                var data = entityResult.Item1.Select(e => e.MapToData()).ToList();
                var pageData = new PageData<CapDeTaiData>
                {
                    Items = data,
                    Total = entityResult.Item2
                };
                return (true, pageData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving paged CapDeTai data. Page: {PageIndex}, Size: {PageSize}", pageIndex, pageSize);
                return (false, null);
            }
        }

        public async Task<bool> UpdateAsync(CapDeTaiData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _capDeTaiRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating CapDeTai with ID: {Id}", model.Id);
                return false;
            }
        }
    }
}
