using SRM.Business.IServices;
using SRM.Data.IRepositories;
using SRM.Data.UOW;
using SRM.Domain.Data;
using SRM.Domain.Entities;
using SRM.Domain.Mappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> AddAsync(UserData user)
        {
            try
            {                
                var userEntity = user.MapToEntity();

                await _unitOfWork.BeginTransactionAsync();

                var role = await _unitOfWork.RoleRepository.GetByNameAsync(user.Role!);
                if (role == null)
                {
                    throw new Exception("Role not found");
                }

                await _unitOfWork.UserRepository.AddAsync(userEntity);
                await _unitOfWork.UserRoleRepository.AddAsync(new UserRole
                {
                    UserId = userEntity.Id,
                    RoleId = role.Id
                });

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<(bool, List<UserData>?)> GetListBasicInfoAsync()
        {
            try
            {
                var users = await _userRepository.GetListBasicInfoAsync();
                var data = users.Select(x => x.MapToData()).ToList();
                return (true, data);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<(bool, PageData<UserData>?)> GetPageAsync(int pageIndex = 1, int pageSize = 10)
        {
            try
            {
                var result = await _userRepository.GetPageAsync(x => true, pageIndex, pageSize);
                var data = result.Item1.Select(x => x.MapToData()).ToList();
                return (true, new PageData<UserData>
                {
                    Items = data,
                    Total = result.Item2
                });
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

        public async Task<bool> UpdateAsync(UserData user)
        {
            try
            {
                var userEntity = user.MapToEntity();
                await _unitOfWork.BeginTransactionAsync();

                var role = await _unitOfWork.RoleRepository.GetByNameAsync(user.Role!);
                if (role == null)
                {
                    throw new Exception("Role not found");
                }

                await _unitOfWork.UserRepository.AddAsync(userEntity);
                await _unitOfWork.UserRoleRepository.AddAsync(new UserRole
                {
                    UserId = userEntity.Id,
                    RoleId = role.Id
                });

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
