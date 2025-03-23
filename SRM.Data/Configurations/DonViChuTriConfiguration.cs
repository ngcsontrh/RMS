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
    public class DonViChuTriConfiguration : IEntityTypeConfiguration<DonViChuTri>
    {
        public void Configure(EntityTypeBuilder<DonViChuTri> builder)
        {
            builder.ToTable("DonViChuTri");

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
                .WithOne(x => x.DonViChuTri)
                .HasForeignKey(x => x.DonViChuTriId)
                .OnDelete(DeleteBehavior.SetNull);
        }    
    }
}
