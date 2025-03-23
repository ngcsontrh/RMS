using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SRM.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Configurations
{
    public class DonViConfiguration : IEntityTypeConfiguration<DonVi>
    {
        public void Configure(EntityTypeBuilder<DonVi> builder)
        {
            builder.ToTable("DonVi");

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.NgayTao);

            builder.Property(x => x.NgaySua);

            builder.Property(x => x.NguoiTaoId)
                .IsUnicode(false)
                .HasMaxLength(36);

            builder.Property(x => x.NguoiSuaId)
                .IsUnicode(false)
                .HasMaxLength(36);

            builder.Property(x => x.Ten)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(x => x.MoTa)
                .HasMaxLength(255);

        }    
    }
}
