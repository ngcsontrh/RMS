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
    public class CapDeTaiConfiguration : IEntityTypeConfiguration<CapDeTai>
    {
        public void Configure(EntityTypeBuilder<CapDeTai> builder)
        {
            builder.ToTable("CapDeTai");

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.NgayTao);

            builder.Property(x => x.NgaySua);

            builder.Property(x => x.NguoiTaoId);

            builder.Property(x => x.NguoiSuaId);

            builder.Property(x => x.Ten)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(x => x.MoTa)
                .HasMaxLength(255);

            builder.HasMany(x => x.DeTais)
                .WithOne(x => x.CapDeTai)
                .HasForeignKey(x => x.CapDeTaiId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
