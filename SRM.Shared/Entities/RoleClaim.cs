using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace SRM.Shared.Entities;

public class RoleClaim : IdentityRoleClaim<int>
{
    public virtual Role Role { get; set; } = null!;
}
