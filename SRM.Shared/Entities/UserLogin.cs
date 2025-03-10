using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace SRM.Shared.Entities
{
    public class UserLogin : IdentityUserLogin<int>
    {
        public virtual User User { get; set; } = null!;
    }
}