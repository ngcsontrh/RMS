using Microsoft.Extensions.Logging;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Domain.Data;
using SRM.Domain.Mappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class SinhVienService : ISinhVienService
    {
        private readonly ISinhVienRepository _sinhVienRepository;
        private readonly ILogger<SinhVienService> _logger;

        public SinhVienService(ISinhVienRepository sinhVienRepository, ILogger<SinhVienService> logger)
        {
            _sinhVienRepository = sinhVienRepository;
            _logger = logger;
        }

        public async Task<bool> AddAsync(SinhVienData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _sinhVienRepository.AddAndSaveAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding SinhVien");
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                await _sinhVienRepository.ExecuteDeleteAsync(id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting SinhVien with ID: {Id}", id);
                return false;
            }
        }

        public async Task<(bool, SinhVienData?)> GetAsync(Guid id)
        {
            try
            {
                var entity = await _sinhVienRepository.GetByIdAsync(id);
                return (true, entity?.MapToData());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving SinhVien with ID: {Id}", id);
                return (false, null);
            }
        }

        public async Task<(bool, List<SinhVienData>?)> GetListAsync()
        {
            try
            {
                var entities = await _sinhVienRepository.GetListAsync();
                var data = entities.Select(e => e.MapToData()).ToList();
                return (true, data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving list of SinhVien");
                return (false, null);
            }
        }

        public async Task<(bool, PageData<SinhVienData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var entityResult = await _sinhVienRepository.GetPageAsync(e => true, pageIndex, pageSize);
                var data = entityResult.Item1.Select(e => e.MapToData()).ToList();
                var pageData = new PageData<SinhVienData>
                {
                    Items = data,
                    Total = entityResult.Item2
                };
                return (true, pageData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving paged SinhVien data. Page: {PageIndex}, Size: {PageSize}", pageIndex, pageSize);
                return (false, null);
            }
        }

        public async Task<bool> UpdateAsync(SinhVienData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _sinhVienRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating SinhVien with ID: {Id}", model.Id);
                return false;
            }
        }
    }
}
