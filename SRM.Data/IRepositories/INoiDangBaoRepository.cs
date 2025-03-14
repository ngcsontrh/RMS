using SRM.Shared.Entities;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface INoiDangBaoRepository : IRepositoryBase<NoiDangBao>
    {
        Task<bool> ExistsAsync(string ten);
        Task<List<NoiDangBao>> GetDropDownDataAsync();
    }
}
