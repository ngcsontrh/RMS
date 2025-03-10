using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class JwtData
    {
        public string? AccessToken { get; set; } 
        public DateTime? Expires { get; set; }
    }
}
