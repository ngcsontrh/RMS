using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRM.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTrangThaiDeTai : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TrangThai",
                table: "DeTai",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrangThai",
                table: "DeTai");
        }
    }
}
