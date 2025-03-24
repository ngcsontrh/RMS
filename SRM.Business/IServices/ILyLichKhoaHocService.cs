using SRM.Data.IRepositories;
using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface ILyLichKhoaHocService
    {
        Task<ExecuteData> GetByUserIdAsync(int userId);
        Task<ExecuteData> UpdateAsync(LyLichKhoaHocData model);
    }
}
