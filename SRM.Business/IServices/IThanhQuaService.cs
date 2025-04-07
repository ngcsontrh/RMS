using SRM.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IThanhQuaService
    {
        Task<bool> AddAsync(ThanhQuaData model);
        Task<bool> UpdateAsync(ThanhQuaData model);
        Task<bool> DeleteAsync(Guid id);
        Task<(bool, ThanhQuaData?)> GetByIdAsync(Guid id);
        Task<(bool, List<ThanhQuaData>?)> GetListAsync();
        Task<(bool, PageData<ThanhQuaData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
