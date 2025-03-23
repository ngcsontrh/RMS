using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRM.Shared.Entities;
using SRM.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");

            builder.Property(u => u.Id)
                .ValueGeneratedOnAdd();

            builder.Property(u => u.FullName);

            builder.Property(u => u.Code);

            builder.Property(u => u.Gender)
                .HasConversion<int>();

            builder.Property(u => u.DonViId);

            builder.HasData(new User
            {
                Id = 1,
                UserName = "admin123",
                NormalizedUserName = "ADMIN123",
                PasswordHash = "AQAAAAIAAYagAAAAEEXMEGGZAfbpqnVi2Ei9taVel/ImJ2UPWjQtkwQPww9Xt7Vxv2JaclNg8M4hojbRMg==", // admin123,
                ConcurrencyStamp = null
            });
        }
    }
}
