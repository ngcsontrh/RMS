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
    public class QuaTrinhCongTacRepository : RepositoryBase<QuaTrinhCongTac>, IQuaTrinhCongTacRepository
    {
        public QuaTrinhCongTacRepository(AppDbContext context) : base(context)
        {
        }
    }
}
