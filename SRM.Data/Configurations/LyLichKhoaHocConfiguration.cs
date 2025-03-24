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
    public class LyLichKhoaHocConfiguration : IEntityTypeConfiguration<LyLichKhoaHoc>
    {
        public void Configure(EntityTypeBuilder<LyLichKhoaHoc> builder)
        {
            builder.ToTable("LyLichKhoaHoc");            
        }
    }
}
