using SRM.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface ITacGiaRepository : IRepositoryBase<TacGia>
    {
        Task<List<TacGia>> GetDropDownDataAsync();
    }
}
