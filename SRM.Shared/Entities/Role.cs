using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace SRM.Shared.Entities;

public class Role : IdentityRole<int>
{
    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public virtual ICollection<RoleClaim> RoleClaims { get; set; } = new List<RoleClaim>();    
}
