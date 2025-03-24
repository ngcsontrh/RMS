using Microsoft.AspNetCore.Identity;
using SRM.Shared.Enums;
using System;
using System.Collections.Generic;

namespace SRM.Shared.Entities;

public class User : IdentityUser<int>
{
    public string? FullName { get; set; }
    public string? Code { get; set; }
    public Gender? Gender { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public int? DonViId { get; set; }

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public virtual ICollection<UserClaim> UserClaims { get; set; } = new List<UserClaim>();
    public virtual ICollection<UserToken> UserTokens { get; set; } = new List<UserToken>();
    public virtual ICollection<UserLogin> UserLogins { get; set; } = new List<UserLogin>();
    public virtual DonVi? DonVi { get; set; }
    public virtual QuaTrinhCongTac? QuaTrinhCongTac { get; set; }
    public virtual LyLichKhoaHoc? LyLichKhoaHoc { get; set; }
}
