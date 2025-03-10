using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SRM.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SRM.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, int, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<CapDeTai> CapDeTais { get; set; }
        public DbSet<CongBo> CongBos { get; set; }
        public DbSet<DeTai> DeTais { get; set; }
        public DbSet<DonVi> DonVis {  get; set; }
        public DbSet<DonViChuTri> DonViChuTris { get; set; }
        public DbSet<HoatDong> HoatDongs { get; set; }
        public DbSet<LoaiHoatDong> LoaiHoatDongs { get; set; }
        public DbSet<NoiDangBao> NoiDangBaos { get; set; }
        public DbSet<TacGia> TacGias { get; set; }
        public DbSet<ThanhQua> ThanhQuas { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);            

            builder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");
            });

            builder.Entity<RoleClaim>(entity =>
            {
                entity.ToTable("RoleClaim");

                entity.HasOne(rc => rc.Role)
                    .WithMany(r => r.RoleClaims)
                    .HasForeignKey(rc => rc.RoleId);
            });

            builder.Entity<User>(entity =>
            {
                entity.ToTable("User");
                entity.HasData(new User
                {
                    Id = 1,
                    UserName = "admin123",
                    PasswordHash = "AQAAAAIAAYagAAAAEOe4N3MEZi7wG5irdaFEbKbVhQgmM3sS7vIQIuP1bw0XHQamSc1jByD00RNZrlrQFg==", // admin123,
                    ConcurrencyStamp = null
                });
            });

            builder.Entity<UserClaim>(entity =>
            {
                entity.ToTable("UserClaim");

                entity.HasOne(uc => uc.User)
                    .WithMany(u => u.UserClaims)
                    .HasForeignKey(uc => uc.UserId);
            });

            builder.Entity<UserLogin>(entity =>
            {
                entity.ToTable("UserLogin");

                entity.HasOne(ul => ul.User)
                    .WithMany(u => u.UserLogins)
                    .HasForeignKey(ul => ul.UserId);
            });

            builder.Entity<UserRole>(entity =>
            {
                entity.ToTable("UserRole");

                entity.HasKey(ur => new { ur.UserId, ur.RoleId });

                entity.HasOne(ur => ur.User)
                    .WithMany(u => u.UserRoles)
                    .HasForeignKey(ur => ur.UserId);

                entity.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId);
            });                

            builder.Entity<UserToken>(entity =>
            {
                entity.ToTable("UserToken");

                entity.HasOne(ut => ut.User)
                    .WithMany(u => u.UserTokens)
                    .HasForeignKey(ut => ut.UserId);
            });

            builder.Entity<CapDeTai>(entity =>
            {
                entity.ToTable("CapDeTai");
            });

            builder.Entity<CongBo>(entity =>
            {
                entity.ToTable("CongBo");

                entity.Property(c => c.ChiSoTacDong)
                    .HasPrecision(18, 6);
                
                entity.Property(c => c.DiemHoiDong)
                    .HasPrecision(18, 6);

                entity.HasOne(c => c.ThanhQua)
                    .WithMany(t => t.CongBos)
                    .HasForeignKey(c => c.ThanhQuaId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(c => c.NoiDangBao)
                    .WithMany(n => n.CongBos)
                    .HasForeignKey(c => c.NoiDangBaoId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            builder.Entity<DeTai>(entity =>
            {
                entity.ToTable("DeTai");
                
                entity.Property(d => d.KinhPhiHangNam)
                    .HasPrecision(18, 6);
                
                entity.Property(d => d.TongKinhPhi)
                    .HasPrecision(18, 6);                

                entity.HasOne(d => d.CapDeTai)
                    .WithMany(c => c.DeTais)
                    .HasForeignKey(d => d.CapDeTaiId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(d => d.DonViChuTri)
                    .WithMany(c => c.DeTais)
                    .HasForeignKey(d => d.DonViChuTriId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            builder.Entity<DonVi>(entity =>
            {
                entity.ToTable("DonVi");
            });

            builder.Entity<DonViChuTri>(entity =>
            {
                entity.ToTable("DonViChuTri");
            });

            builder.Entity<HoatDong>(entity =>
            {
                entity.ToTable("HoatDong");

                entity.Ignore(h => h.ThanhVienThamGias);
                
                entity.Property(h => h.KinhPhi)
                    .HasPrecision(18, 6);

                entity.HasOne(h => h.LoaiHoatDong)
                    .WithMany(l => l.HoatDongs)
                    .HasForeignKey(h => h.LoaiHoatDongId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            builder.Entity<LoaiHoatDong>(entity =>
            {
                entity.ToTable("LoaiHoatDong");
            });

            builder.Entity<NoiDangBao>(entity =>
            {
                entity.ToTable("NoiDangBao");
            });

            builder.Entity<TacGia>(entity =>
            {
                entity.ToTable("TacGia");

                entity.HasOne(t => t.DonVi)
                    .WithMany(t => t.TacGias)
                    .HasForeignKey(t => t.DonViId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            builder.Entity<ThanhQua>(entity =>
            {
                entity.ToTable("ThanhQua");
            });
        }
    }
}
