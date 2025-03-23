using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRM.Shared.Entities;

public class CongBoConfig : IEntityTypeConfiguration<CongBo>
{
    public void Configure(EntityTypeBuilder<CongBo> builder)
    {
        builder.ToTable("CongBo");

        builder.Property(c => c.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.NgayTao);

        builder.Property(x => x.NgaySua);

        builder.Property(x => x.NguoiTaoId)
            .IsUnicode(false)
            .HasMaxLength(36);

        builder.Property(x => x.NguoiSuaId)
            .IsUnicode(false)
            .HasMaxLength(36);

        builder.Property(cb => cb.Ten)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(cb => cb.NoiDangBaoId)
            .IsUnicode(false)
            .HasMaxLength(36);

        builder.Property(cb => cb.LinkMinhChungTapChi)
            .HasMaxLength(500);

        builder.Property(cb => cb.DiaDiem)
            .HasMaxLength(200);

        builder.Property(cb => cb.TenTapChi)
            .HasMaxLength(100);

        builder.Property(cb => cb.NhaXuatBan)
            .HasMaxLength(100);

        builder.Property(cb => cb.FileMinhChungBaiBao)
            .HasMaxLength(500);

        builder.Property(cb => cb.LinkBaiBao)
            .HasMaxLength(500);

        builder.Property(cb => cb.NgayGuiDang);

        builder.Property(cb => cb.NgayCongBo);

        builder.Property(cb => cb.ChiSoTacDong)
            .HasColumnType("decimal(18,2)");

        builder.Property(cb => cb.Ky);

        builder.Property(cb => cb.Tap);

        builder.Property(cb => cb.Trang)
            .HasMaxLength(50);

        builder.Property(cb => cb.DiemHoiDong)
            .HasColumnType("decimal(18,2)");

        builder.Property(cb => cb.TenHoiDong)
            .HasMaxLength(200);

        builder.Property(cb => cb.LoaiQ)
            .HasMaxLength(50);

        builder.Property(cb => cb.ThanhQuaId)
            .IsUnicode(false)
            .HasMaxLength(36);

        builder.Property(cb => cb.LinkMinhChungLoaiQ)
            .HasMaxLength(500);

        builder.Property(cb => cb.TacGiaChinh)
            .HasMaxLength(200);

        builder.Property(cb => cb.TacGiaLienHe)
            .HasMaxLength(200);

        builder.Property(cb => cb.DongTacGias)
            .HasMaxLength(500);

        builder.Property(cb => cb.LoaiHoTroChiPhi)
            .HasMaxLength(100);

        builder.Property(cb => cb.PhanChiaSuDongGop)
            .HasMaxLength(500);

        builder.HasOne(cb => cb.NoiDangBao)
            .WithMany()
            .HasForeignKey(cb => cb.NoiDangBaoId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(cb => cb.ThanhQua)
            .WithMany()
            .HasForeignKey(cb => cb.ThanhQuaId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
