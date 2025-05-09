﻿using SRM.Shared.Models.Data;
using SRM.Shared.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IHoatDongService
    {
        Task<ExecuteData> AddAsync(HoatDongData model);
        Task<ExecuteData> UpdateAsync(HoatDongData model);
        Task<ExecuteData> GetAsync(int id);
        Task<ExecuteData> GetPageAsync(HoatDongSearch searchModel, int pageIndex = 1, int pageSize = 10);
    }
}
