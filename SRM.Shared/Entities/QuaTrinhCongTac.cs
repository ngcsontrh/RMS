using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Entities
{
    public class QuaTrinhCongTac : EntityBase
    {
        public int UserId { get; set; }
        public int? NamBatDau { get; set; }
        public int? NamKetThuc { get; set; }
        public string? ViTriCongTac { get; set; }
        public string? ToChucCongTac { get; set; }
        public string? DiaChiToChuc { get; set; }

        public virtual User? User { get; set; }
    }
}
