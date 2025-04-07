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
    public class ThanhQuaService : IThanhQuaService
    {
        private readonly IThanhQuaRepository _ThanhQuaRepository;

        public ThanhQuaService(IThanhQuaRepository ThanhQuaRepository)
        {
            _ThanhQuaRepository = ThanhQuaRepository;
        }

        public async Task<bool> AddAsync(ThanhQuaData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _ThanhQuaRepository.AddAndSaveAsync(entity);
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
                await _ThanhQuaRepository.ExecuteDeleteAsync(id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<(bool, ThanhQuaData?)> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _ThanhQuaRepository.GetByIdAsync(id);
                return (true, entity?.MapToData());
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, List<ThanhQuaData>?)> GetListAsync()
        {
            try
            {
                var entities = await _ThanhQuaRepository.GetListAsync();
                var data = entities.Select(e => e.MapToData()).ToList();
                return (true, data);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, PageData<ThanhQuaData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _ThanhQuaRepository.GetPageAsync(e => true, pageIndex, pageSize);
                var data = result.Item1.Select(e => e.MapToData()).ToList();
                var pageData = new PageData<ThanhQuaData>
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

        public async Task<bool> UpdateAsync(ThanhQuaData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _ThanhQuaRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
