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
    public class LoaiHoatDongService : ILoaiHoatDongService
    {
        private readonly ILoaiHoatDongRepository _LoaiHoatDongRepository;

        public LoaiHoatDongService(ILoaiHoatDongRepository LoaiHoatDongRepository)
        {
            _LoaiHoatDongRepository = LoaiHoatDongRepository;
        }

        public async Task<bool> AddAsync(LoaiHoatDongData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _LoaiHoatDongRepository.AddAndSaveAsync(entity);
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
                await _LoaiHoatDongRepository.ExecuteDeleteAsync(id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<(bool, LoaiHoatDongData?)> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _LoaiHoatDongRepository.GetByIdAsync(id);
                return (true, entity?.MapToData());
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, List<LoaiHoatDongData>?)> GetListAsync()
        {
            try
            {
                var entities = await _LoaiHoatDongRepository.GetListAsync();
                var data = entities.Select(e => e.MapToData()).ToList();
                return (true, data);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, PageData<LoaiHoatDongData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _LoaiHoatDongRepository.GetPageAsync(e => true, pageIndex, pageSize);
                var data = result.Item1.Select(e => e.MapToData()).ToList();
                var pageData = new PageData<LoaiHoatDongData>
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

        public async Task<bool> UpdateAsync(LoaiHoatDongData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _LoaiHoatDongRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
