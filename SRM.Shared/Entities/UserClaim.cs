using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace SRM.Shared.Entities
{
    public class UserClaim : IdentityUserClaim<int>
    {
        public virtual User User { get; set; } = null!;
    }
}