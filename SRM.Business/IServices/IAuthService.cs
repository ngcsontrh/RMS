using SRM.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IAuthService
    {
        Task<(bool, TokenData?)> LoginAsync(LoginData loginData);
        Task<(bool, AuthData?)> GetMeAsync(string username);
    }
}
