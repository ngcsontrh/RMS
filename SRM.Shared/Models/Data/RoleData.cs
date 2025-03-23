using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class RoleData
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public List<string>? Permissions { get; set; }
    }
}
