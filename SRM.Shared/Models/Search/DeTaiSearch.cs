using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Search
{
    public class DeTaiSearch
    {
        public int? TacGiaId { get; set; }

        public DeTaiSearch() { }

        public DeTaiSearch(int? tacGiaId)
        {
            TacGiaId = tacGiaId;
        }
    }
}
