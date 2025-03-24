using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class QuaTrinhCongTacData
    {
        public int? Id { get; set; }
        public int? UserId { get; set; }
        public int? NamBatDau { get; set; }
        public int? NamKetThuc { get; set; }
        public string? ViTriCongTac { get; set; }
        public string? ToChucCongTac { get; set; }
        public string? DiaChiToChuc { get; set; }
    }
}
