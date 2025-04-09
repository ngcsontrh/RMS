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
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _RoleRepository;
        private readonly ILogger<RoleService> _logger;

        public RoleService(IRoleRepository RoleRepository, ILogger<RoleService> logger)
        {
            _RoleRepository = RoleRepository;
            _logger = logger;
        }

        public async Task<bool> AddAsync(RoleData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _RoleRepository.AddAndSaveAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding Role");
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                await _RoleRepository.ExecuteDeleteAsync(id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting Role with ID: {Id}", id);
                return false;
            }
        }

        public async Task<(bool, RoleData?)> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _RoleRepository.GetByIdAsync(id);
                return (true, entity?.MapToData());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving Role with ID: {Id}", id);
                return (false, null);
            }
        }

        public async Task<(bool, List<RoleData>?)> GetListAsync()
        {
            try
            {
                var entities = await _RoleRepository.GetListAsync();
                var data = entities.Select(e => e.MapToData()).ToList();
                return (true, data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving list of Role");
                return (false, null);
            }
        }

        public async Task<(bool, PageData<RoleData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var entityResult = await _RoleRepository.GetPageAsync(e => true, pageIndex, pageSize);
                var data = entityResult.Item1.Select(e => e.MapToData()).ToList();
                var pageData = new PageData<RoleData>
                {
                    Items = data,
                    Total = entityResult.Item2
                };
                return (true, pageData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving paged Role data. Page: {PageIndex}, Size: {PageSize}", pageIndex, pageSize);
                return (false, null);
            }
        }

        public async Task<bool> UpdateAsync(RoleData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _RoleRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating Role with ID: {Id}", model.Id);
                return false;
            }
        }
    }
}
