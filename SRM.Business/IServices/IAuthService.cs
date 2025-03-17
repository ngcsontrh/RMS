using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Business.IServices
{
    public interface IAuthService
    {
        Task<ExecuteData> LoginAsync(LoginData loginData);
        Task<ExecuteData> RegisterAsync(RegisterData registerData);    
        Task<ExecuteData> GetMeAsync(string userId);
    }
}
