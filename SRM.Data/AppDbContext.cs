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
        public DbSet<ThanhQua> ThanhQuas { get; set; }        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            ChangeAuditFields();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            ChangeAuditFields();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void ChangeAuditFields()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                var entityType = entry.Entity.GetType();
                var ngayTaoProperty = entityType.GetProperty(nameof(EntityBase.NgayTao));
                var ngaySuaProperty = entityType.GetProperty(nameof(EntityBase.NgaySua));

                if (entry.State == EntityState.Added && ngayTaoProperty != null && ngaySuaProperty != null)
                {
                    ngayTaoProperty.SetValue(entry.Entity, DateTime.UtcNow);
                    ngaySuaProperty.SetValue(entry.Entity, DateTime.UtcNow);
                }
                
                if (entry.State == EntityState.Modified && ngaySuaProperty != null)
                {
                    ngaySuaProperty.SetValue(entry.Entity, DateTime.UtcNow);
                }
            }
        }
    }
}
