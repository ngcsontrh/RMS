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
    public class NoiDangBaoConfiguration : IEntityTypeConfiguration<NoiDangBao>
    {
        public void Configure(EntityTypeBuilder<NoiDangBao> builder)
        {
            builder.ToTable("NoiDangBao");

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

            builder.HasMany(x => x.CongBos)
                .WithOne(x => x.NoiDangBao)
                .HasForeignKey(x => x.NoiDangBaoId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
