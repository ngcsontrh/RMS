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
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("Role");

            builder.HasData(new Role[]
            {
                new Role { Id = 1, Name = "Admin", NormalizedName = "ADMIN" },
                new Role { Id = 2, Name = "Giảng viên", NormalizedName = "GIẢNG VIÊN" },
                new Role { Id = 3, Name = "Sinh viên", NormalizedName = "SINH VIÊN" }
            });
        }
    }
}
