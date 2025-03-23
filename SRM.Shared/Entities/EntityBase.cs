using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class EntityBase
    {
        public int Id { get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgaySua { get; set; }
        public int? NguoiTaoId { get; set; }
        public int? NguoiSuaId { get; set; }
    }
}
