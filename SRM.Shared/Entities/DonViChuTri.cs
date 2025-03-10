using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class DonViChuTri : EntityBase
    {
        public string Ten { get; set; } = null!;

        public ICollection<DeTai> DeTais { get; set; } = new List<DeTai>();
    }
}
