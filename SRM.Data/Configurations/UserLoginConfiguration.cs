using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRM.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Configurations
{
    public class UserLoginConfiguration : IEntityTypeConfiguration<UserLogin>
    {
        public void Configure(EntityTypeBuilder<UserLogin> builder)
        {
            builder.ToTable("UserLogin");

            builder.HasOne(ul => ul.User)
                .WithMany(u => u.UserLogins)
                .HasForeignKey(ul => ul.UserId);
        }
    }
}
