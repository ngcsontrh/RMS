using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class AuthData
    {
        public UserData? UserInfo { get; set; }
        public HashSet<string>? Roles { get; set; }
        public HashSet<string>? Permissions { get; set; }
    }
}
