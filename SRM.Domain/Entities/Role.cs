using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SRM.Domain.Entities
{
    [Table("Role")]
    public class Role : EntityBase
    {
        public string Name { get; set; } = null!;
    }
}
