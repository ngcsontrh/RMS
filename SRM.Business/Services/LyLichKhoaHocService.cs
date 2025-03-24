using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SRM.Business.IServices;
using SRM.Data;
using SRM.Data.IRepositories;
using SRM.Data.Repositories;
using SRM.Shared.Entities;
using SRM.Shared.Models.Data;
using SRM.Shared.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class LyLichKhoaHocService : ILyLichKhoaHocService
    {
        private readonly ILyLichKhoaHocRepository _lyLichKhoaHocRepository;
        private readonly ILogger<LyLichKhoaHocService> _logger;
        private readonly IMapper _mapper;

        public LyLichKhoaHocService(
            ILyLichKhoaHocRepository lyLichKhoaHocRepository,
            ILogger<LyLichKhoaHocService> logger,
            IMapper mapper
            )
        {
            _lyLichKhoaHocRepository = lyLichKhoaHocRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ExecuteData> GetByUserIdAsync(int userId)
        {
            try
            {
                var entity = await _lyLichKhoaHocRepository.GetByUserIdAsync(userId);
                if (entity == null)
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.NotFound
                    };
                }
                var model = _mapper.Map<LyLichKhoaHocData>(entity);
                return new ExecuteData
                {
                    Success = true,
                    Data = model
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError
                };
            }
        }

        public async Task<ExecuteData> UpdateAsync(LyLichKhoaHocData model)
        {
            try
            {
                var entity = _mapper.Map<LyLichKhoaHoc>(model);
                await _lyLichKhoaHocRepository.UpdateAsync(entity);
                return new ExecuteData
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ExecuteData
                {
                    Success = false,
                    Message = GlobalConstraint.GeneralError
                };
            }
        }      
    }
}
