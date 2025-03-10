using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class ThanhQua : EntityBase
    {
        public string Ten { get; set; } = null!;

        public ICollection<CongBo> CongBos { get; set; } = new List<CongBo>();
    }
}
