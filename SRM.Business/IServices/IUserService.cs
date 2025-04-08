using SRM.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IUserService
    {
        Task<(bool, List<UserData>?)> GetListBasicInfoAsync();
        Task<bool> AddAsync(UserData user);
        Task<bool> UpdateAsync(UserData user);
        Task<(bool, UserData?)> GetByIdAsync(Guid id);
        Task<(bool, PageData<UserData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10);
    }
}
