using AutoMapper;
using Microsoft.Extensions.Logging;
using SRM.Business.IServices;
using SRM.Data.IRepositories;
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
    public class QuaTrinhCongTacService : IQuaTrinhCongTacService
    {
        private readonly IQuaTrinhCongTacRepository _quaTrinhCongTacRepository;
        private readonly ILogger<QuaTrinhCongTacService> _logger;
        private readonly IMapper _mapper;

        public QuaTrinhCongTacService(
            IQuaTrinhCongTacRepository quaTrinhCongTacRepository,
            ILogger<QuaTrinhCongTacService> logger,
            IMapper mapper
            )
        {
            _quaTrinhCongTacRepository = quaTrinhCongTacRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ExecuteData> AddAsync(QuaTrinhCongTacData model)
        {
            try
            {
                var entity = _mapper.Map<QuaTrinhCongTac>(model);
                await _quaTrinhCongTacRepository.AddAsync(entity);
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.AddSuccessful
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

        public async Task<ExecuteData> GetByUserIdAsync(int userId)
        {
            try
            {
                var entity = await _quaTrinhCongTacRepository.GetByUserIdAsync(userId);
                if (entity == null)
                {
                    return new ExecuteData
                    {
                        Success = false,
                        Message = GlobalConstraint.NotFound
                    };
                }
                var model = _mapper.Map<QuaTrinhCongTacData>(entity);
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

        public async Task<ExecuteData> UpdateAsync(QuaTrinhCongTacData model)
        {
            try
            {
                var entity = _mapper.Map<QuaTrinhCongTac>(model);
                await _quaTrinhCongTacRepository.UpdateAsync(entity);
                return new ExecuteData
                {
                    Success = true,
                    Message = GlobalConstraint.UpdateSuccessful
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
