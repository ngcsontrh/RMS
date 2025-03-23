using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRM.Shared.Entities;

public class DeTaiConfig : IEntityTypeConfiguration<DeTai>
{
    public void Configure(EntityTypeBuilder<DeTai> builder)
    {
        builder.ToTable("DeTai");

        builder.Property(dt => dt.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.NgayTao);

        builder.Property(x => x.NgaySua);

        builder.Property(x => x.NguoiTaoId);

        builder.Property(x => x.NguoiSuaId)
            .IsUnicode(false)
            .HasMaxLength(36);

        builder.Property(dt => dt.Ten)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(dt => dt.MaSo)
            .HasMaxLength(50);

        builder.Property(dt => dt.MucTieu)
            .HasMaxLength(500);

        builder.Property(dt => dt.NoiDung)
            .HasMaxLength(1000);

        builder.Property(dt => dt.TongKinhPhi)
            .HasColumnType("decimal(18,2)");

        builder.Property(dt => dt.NgayBatDau);

        builder.Property(dt => dt.NgayKetThuc);

        builder.Property(dt => dt.KinhPhiHangNam)
            .HasColumnType("decimal(18,2)");

        builder.Property(dt => dt.HoSoNghiemThu)
            .HasMaxLength(500);

        builder.Property(dt => dt.HoSoSanPham)
            .HasMaxLength(500);

        builder.Property(dt => dt.DonViChuTriId)
            .IsUnicode(false)
            .HasMaxLength(36);

        builder.Property(dt => dt.ChuNhiem)
            .HasMaxLength(200);

        builder.Property(dt => dt.CanBoThamGias)
            .HasMaxLength(500);

        builder.Property(dt => dt.PhanChiaSuDongGop)
            .HasMaxLength(500);

        builder.HasOne(dt => dt.CapDeTai)
            .WithMany()
            .HasForeignKey(dt => dt.CapDeTaiId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(dt => dt.DonViChuTri)
            .WithMany()
            .HasForeignKey(dt => dt.DonViChuTriId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
