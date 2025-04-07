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
    public class NoiDangBaoService : INoiDangBaoService
    {
        private readonly INoiDangBaoRepository _NoiDangBaoRepository;

        public NoiDangBaoService(INoiDangBaoRepository NoiDangBaoRepository)
        {
            _NoiDangBaoRepository = NoiDangBaoRepository;
        }

        public async Task<bool> AddAsync(NoiDangBaoData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _NoiDangBaoRepository.AddAndSaveAsync(entity);
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
                await _NoiDangBaoRepository.ExecuteDeleteAsync(id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<(bool, NoiDangBaoData?)> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _NoiDangBaoRepository.GetByIdAsync(id);
                return (true, entity?.MapToData());
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, List<NoiDangBaoData>?)> GetListAsync()
        {
            try
            {
                var entities = await _NoiDangBaoRepository.GetListAsync();
                var data = entities.Select(e => e.MapToData()).ToList();
                return (true, data);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, PageData<NoiDangBaoData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _NoiDangBaoRepository.GetPageAsync(e => true, pageIndex, pageSize);
                var data = result.Item1.Select(e => e.MapToData()).ToList();
                var pageData = new PageData<NoiDangBaoData>
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

        public async Task<bool> UpdateAsync(NoiDangBaoData model)
        {
            try
            {
                var entity = model.MapToEntity();
                await _NoiDangBaoRepository.UpdateAndSaveAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
