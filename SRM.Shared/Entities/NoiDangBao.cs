using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class NoiDangBao : EntityBase
    {
        public string Ten { get; set; } = null!;
        public string? MoTa { get; set; }

        public virtual ICollection<CongBo> CongBos { get; set; } = new List<CongBo>();
    }
}
