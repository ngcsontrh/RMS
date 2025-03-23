using AutoMapper;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class LyLichKhoaHocRepository : RepositoryBase<LyLichKhoaHoc>, ILyLichKhoaHocRepository
    {
        public LyLichKhoaHocRepository(AppDbContext context) : base(context)
        {
        }
    }
}
