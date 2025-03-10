using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace SRM.Shared.Entities
{
    public class UserToken : IdentityUserToken<int>
    {
        public virtual User User { get; set; } = null!;
        public virtual Role Role { get; set; } = null!;
    }
}
