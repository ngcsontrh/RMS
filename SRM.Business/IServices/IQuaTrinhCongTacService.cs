using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IQuaTrinhCongTacService
    {
        Task<ExecuteData> AddAsync(QuaTrinhCongTacData model);
        Task<ExecuteData> UpdateAsync(QuaTrinhCongTacData model);
        Task<ExecuteData> GetByUserIdAsync(int userId);
    }
}
