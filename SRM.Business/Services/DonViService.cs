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
    public class DonViService : IDonViService
    {
        private readonly IDonViRepository _DonViRepository;

        public DonViService(IDonViRepository DonViRepository)
        {
            _DonViRepository = DonViRepository;
        }

        public async Task<bool> AddAsync(DonViData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _DonViRepository.AddAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                await _DonViRepository.ExecuteDeleteAsync(id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<(bool, DonViData?)> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _DonViRepository.GetByIdAsync(id);
                return (true, entity?.MapToData());
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, List<DonViData>?)> GetListAsync()
        {
            try
            {
                var entities = await _DonViRepository.GetListAsync();
                var data = entities.Select(e => e.MapToData()).ToList();
                return (true, data);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, PageData<DonViData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _DonViRepository.GetPageAsync(e => true, pageIndex, pageSize);
                var data = result.Item1.Select(e => e.MapToData()).ToList();
                var pageData = new PageData<DonViData>
                {
                    Items = data,
                    Total = result.Item2
                };
                return (true, pageData);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<bool> UpdateAsync(DonViData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _DonViRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
