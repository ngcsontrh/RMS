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
    public class DeTaiService : IDeTaiService
    {
        private readonly IDeTaiRepository _deTaiRepository;

        public DeTaiService(IDeTaiRepository deTaiRepository)
        {
            _deTaiRepository = deTaiRepository;
        }

        public async Task<bool> AddAsync(DeTaiData model)
        {
            try
            {
                var entity = model.MapTodata();
                await _deTaiRepository.AddAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> ApproveAsync(Guid id)
        {
            try
            {
                await _deTaiRepository.ApproveAsync(id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<(bool, DeTaiData?)> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _deTaiRepository.GetDetailAsync(id);
                var data = entity?.MapToData();
                return (true, data);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, PageData<DeTaiData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var entity = await _deTaiRepository.GetPageDetailAsync(pageIndex, pageSize);
                var data = entity.Item1.Select(x => x.MapToData()).ToList();
                var pageData = new PageData<DeTaiData>
                {
                    Items = data,
                    Total = entity.Item2
                };
                return (true, pageData);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<bool> UpdateAsync(DeTaiData model)
        {
            try
            {
                var entity = model.MapTodata();
                await _deTaiRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
