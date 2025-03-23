using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace SRM.Shared.Entities
{
    public class UserClaim : IdentityUserClaim<int>
    {
        public UserClaim() : base() { }

        public UserClaim (int userId, string claimType, string claimValue)
        {
            UserId = userId;
            ClaimType = claimType;
            ClaimValue = claimValue;            
        }

        public virtual User User { get; set; } = null!;
    }
}