using Microsoft.EntityFrameworkCore;
using SRM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Security;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SRM.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<CapDeTai> CapDeTais { get; set; }
        public DbSet<CongBo> CongBos { get; set; }
        public DbSet<DeTai> DeTais { get; set; }
        public DbSet<DonVi> DonVis {  get; set; }
        public DbSet<DonViChuTri> DonViChuTris { get; set; }
        public DbSet<HoatDong> HoatDongs { get; set; }
        public DbSet<LoaiHoatDong> LoaiHoatDongs { get; set; }
        public DbSet<NoiDangBao> NoiDangBaos { get; set; }
        public DbSet<ThanhQua> ThanhQuas { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Username)
                    .IsUnique();
                entity.HasIndex(u => u.Email);
                entity.HasIndex(u => u.MaVienChuc);
                entity.HasIndex(u => u.SoDienThoai);

                entity.HasData(new User
                {
                    Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                    Username = "admin",
                    Password = "AQAAAAIAAYagAAAAENKmRj5jqegps3RqNwm9hCkccpMsKxFAP7p4ty/6/pZLIpwIiecVJv/cnGIQP/3PBQ==",
                });
            });

            builder.Entity<Role>(entity =>
            {
                entity.HasIndex(r => r.Name)
                    .IsUnique();
                entity.HasData(new Role
                {
                    Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                    Name = "Admin",
                });
            });

            builder.Entity<UserRole>(entity =>
            {
                entity.HasKey(ur => new { ur.UserId, ur.RoleId });
                entity.HasOne(ur => ur.User)
                    .WithMany(u => u.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(ur => ur.Role)
                    .WithMany()
                    .HasForeignKey(ur => ur.RoleId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasData(new UserRole
                {
                    UserId = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                    RoleId = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                });
            });

            builder.Entity<CongBo>(entity =>
            {
                entity.Property(x => x.ChiSoTacDong).HasPrecision(18, 2);
                entity.Property(x => x.DiemHoiDong).HasPrecision(18, 2);
            });

            builder.Entity<DeTai>(entity =>
            {
                entity.Property(x => x.KinhPhiHangNam).HasPrecision(18, 2);
                entity.Property(x => x.TongKinhPhi).HasPrecision(18, 2);
            });

            builder.Entity<HoatDong>(entity =>
            {
                entity.Property(x => x.KinhPhi).HasPrecision(18, 2);
            });

            base.OnModelCreating(builder);            
        }
    }
}
