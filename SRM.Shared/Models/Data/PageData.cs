using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public class PageData<TData>
    {
        public List<TData> Items { get; set; } = new List<TData>();
        public int Total { get; set; }
    }
}
