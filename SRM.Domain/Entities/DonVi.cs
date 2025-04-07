using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Domain.Entities
{
    [Table("DonVi")]
    public class DonVi : EntityBase
    {
        public string? Ten { get; set; }
    }
}
