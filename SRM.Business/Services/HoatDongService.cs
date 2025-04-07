using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Domain.Data;
using SRM.Domain.Entities;
using SRM.Domain.Mappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class HoatDongService : IHoatDongService
    {
        private readonly IRepositoryBase<HoatDong> _HoatDongRepository;

        public HoatDongService(IRepositoryBase<HoatDong> HoatDongRepository)
        {
            _HoatDongRepository = HoatDongRepository;
        }

        public async Task<bool> AddAsync(HoatDongData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _HoatDongRepository.AddAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<(bool, HoatDongData?)> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _HoatDongRepository.GetByIdAsync(id);
                var model = entity?.MapToData();
                return (true, model);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, PageData<HoatDongData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _HoatDongRepository.GetPageAsync(x => true, pageIndex, pageSize);
                var data = result.Item1.Select(x => x.MapToData()).ToList();
                var pageData = new PageData<HoatDongData>
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

        public async Task<bool> UpdateAsync(HoatDongData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _HoatDongRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
