using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRM.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDeTaiColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "NguoiDeXuatId",
                table: "DeTai",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiPheDuyet",
                table: "DeTai",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeTai_NguoiDeXuatId",
                table: "DeTai",
                column: "NguoiDeXuatId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeTai_User_NguoiDeXuatId",
                table: "DeTai",
                column: "NguoiDeXuatId",
                principalTable: "User",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeTai_User_NguoiDeXuatId",
                table: "DeTai");

            migrationBuilder.DropIndex(
                name: "IX_DeTai_NguoiDeXuatId",
                table: "DeTai");

            migrationBuilder.DropColumn(
                name: "NguoiDeXuatId",
                table: "DeTai");

            migrationBuilder.DropColumn(
                name: "TrangThaiPheDuyet",
                table: "DeTai");
        }
    }
}
