using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class DonVi : EntityBase
    {
        public string Ten { get; set; } = null!;
        public string? MoTa { get; set; }
    }
}
