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
    public class DonViChuTriService : IDonViChuTriService
    {
        private readonly IDonViChuTriRepository _donViChuTriRepository;

        public DonViChuTriService(IDonViChuTriRepository donViChuTriRepository)
        {
            _donViChuTriRepository = donViChuTriRepository;
        }

        public async Task<bool> AddAsync(DonViChuTriData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _donViChuTriRepository.AddAndSaveAsync(entity);
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
                await _donViChuTriRepository.ExecuteDeleteAsync(id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<(bool, DonViChuTriData?)> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _donViChuTriRepository.GetByIdAsync(id);
                return (true, entity?.MapToData());
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, List<DonViChuTriData>?)> GetListAsync()
        {
            try
            {
                var entities = await _donViChuTriRepository.GetListAsync();
                var data = entities.Select(e => e.MapToData()).ToList();
                return (true, data);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, PageData<DonViChuTriData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _donViChuTriRepository.GetPageAsync(e => true, pageIndex, pageSize);
                var data = result.Item1.Select(e => e.MapToData()).ToList();
                var pageData = new PageData<DonViChuTriData>
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

        public async Task<bool> UpdateAsync(DonViChuTriData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _donViChuTriRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
