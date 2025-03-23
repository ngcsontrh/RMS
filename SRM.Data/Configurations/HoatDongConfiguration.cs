using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRM.Shared.Entities;

public class HoatDongConfig : IEntityTypeConfiguration<HoatDong>
{
    public void Configure(EntityTypeBuilder<HoatDong> builder)
    {
        builder.ToTable("HoatDong");

        builder.Property(hd => hd.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.NgayTao);

        builder.Property(x => x.NgaySua);

        builder.Property(x => x.NguoiTaoId)
            .IsUnicode(false)
            .HasMaxLength(36);

        builder.Property(x => x.NguoiSuaId)
            .IsUnicode(false)
            .HasMaxLength(36);

        builder.Property(hd => hd.Ten)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(hd => hd.LoaiHoatDongId)
            .IsUnicode(false)
            .HasMaxLength(36);

        builder.Property(hd => hd.NoiDung)
            .HasMaxLength(1000);

        builder.Property(hd => hd.GhiChu)
            .HasMaxLength(500);

        builder.Property(hd => hd.DiaChi)
            .HasMaxLength(200);

        builder.Property(hd => hd.KinhPhi)
            .HasColumnType("decimal(18,2)");

        builder.Property(hd => hd.SoTrang);

        builder.Property(hd => hd.SoTiet);

        builder.Property(hd => hd.FileDinhKem)
            .HasMaxLength(500);

        builder.Property(hd => hd.NgayBatDau);

        builder.Property(hd => hd.NgayKetThuc);

        builder.Property(hd => hd.DuongDan)
            .HasMaxLength(500);

        builder.Property(hd => hd.ChuNhiem)
            .HasMaxLength(200);

        builder.Property(hd => hd.ThanhVienThamGia)
            .HasMaxLength(500);

        builder.Property(hd => hd.PhanChiaSuDongGop)
            .HasMaxLength(500);

        builder.HasOne(hd => hd.LoaiHoatDong)
            .WithMany()
            .HasForeignKey(hd => hd.LoaiHoatDongId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
