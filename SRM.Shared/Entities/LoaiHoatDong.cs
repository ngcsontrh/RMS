using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class LoaiHoatDong : EntityBase
    {
        public string Ten { get; set; } = null!;

        public virtual ICollection<HoatDong> HoatDongs { get; set; } = new List<HoatDong>();
    }
}
