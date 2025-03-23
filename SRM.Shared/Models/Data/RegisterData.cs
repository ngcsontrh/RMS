using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class RegisterData
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? FullName { get; set; }
        public string? Code { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? RoleName { get; set; }
        public int? DonViId { get; set; }
    }
}
