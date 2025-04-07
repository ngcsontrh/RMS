using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRM.Data.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CapDeTai",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CapDeTai", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DonVi",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonVi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DonViChuTri",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonViChuTri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoaiHoatDong",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiHoatDong", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NoiDangBao",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoiDangBao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ThanhQua",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThanhQua", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SoDienThoai = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaVienChuc = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    GioiTinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonViId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    NgaySinh = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DanToc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChucDanh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChuyenNganh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HocVi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TruongDH = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_DonVi_DonViId",
                        column: x => x.DonViId,
                        principalTable: "DonVi",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DeTai",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CapDeTaiId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaSo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucTieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TongKinhPhi = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NgayBatDau = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayKetThuc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    KinhPhiHangNam = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    HoSoNghiemThu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoSoSanPham = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonViChuTriId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ChuNhiem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CanBoThamGias = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhanChiaSuDongGop = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeTai", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeTai_CapDeTai_CapDeTaiId",
                        column: x => x.CapDeTaiId,
                        principalTable: "CapDeTai",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DeTai_DonViChuTri_DonViChuTriId",
                        column: x => x.DonViChuTriId,
                        principalTable: "DonViChuTri",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HoatDong",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoaiHoatDongId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KinhPhi = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SoTrang = table.Column<int>(type: "int", nullable: true),
                    SoTiet = table.Column<int>(type: "int", nullable: true),
                    FileDinhKem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayBatDau = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayKetThuc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DuongDan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChuNhiem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThanhVienThamGias = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhanChiaSuDongGop = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoatDong", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HoatDong_LoaiHoatDong_LoaiHoatDongId",
                        column: x => x.LoaiHoatDongId,
                        principalTable: "LoaiHoatDong",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CongBo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NoiDangBaoId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LinkMinhChungTapChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaDiem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenTapChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NhaXuatBan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileMinhChungBaiBao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LinkBaiBao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayGuiDang = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayCongBo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ChiSoTacDong = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Ky = table.Column<int>(type: "int", nullable: true),
                    Tap = table.Column<int>(type: "int", nullable: true),
                    Trang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiemHoiDong = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TenHoiDong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoaiQ = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThanhQuaId = table.Column<int>(type: "int", nullable: true),
                    LinkMinhChungLoaiQ = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TacGiaChinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TacGiaLienHe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DongTacGias = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoaiHoTroChiPhi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhanChiaSuDongGop = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThanhQuaId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CongBo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CongBo_NoiDangBao_NoiDangBaoId",
                        column: x => x.NoiDangBaoId,
                        principalTable: "NoiDangBao",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CongBo_ThanhQua_ThanhQuaId1",
                        column: x => x.ThanhQuaId1,
                        principalTable: "ThanhQua",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRole_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRole_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Name", "NgaySua", "NgayTao" },
                values: new object[] { new Guid("00000000-0000-0000-0000-000000000001"), "Admin", null, null });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "ChucDanh", "ChuyenNganh", "DanToc", "DonViId", "Email", "GioiTinh", "HoTen", "HocVi", "MaVienChuc", "NgaySinh", "NgaySua", "NgayTao", "Password", "SoDienThoai", "TruongDH", "Username" },
                values: new object[] { new Guid("00000000-0000-0000-0000-000000000001"), null, null, null, null, null, null, null, null, null, null, null, null, "admin", null, null, "admin" });

            migrationBuilder.InsertData(
                table: "UserRole",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { new Guid("00000000-0000-0000-0000-000000000001"), new Guid("00000000-0000-0000-0000-000000000001") });

            migrationBuilder.CreateIndex(
                name: "IX_CongBo_NoiDangBaoId",
                table: "CongBo",
                column: "NoiDangBaoId");

            migrationBuilder.CreateIndex(
                name: "IX_CongBo_ThanhQuaId1",
                table: "CongBo",
                column: "ThanhQuaId1");

            migrationBuilder.CreateIndex(
                name: "IX_DeTai_CapDeTaiId",
                table: "DeTai",
                column: "CapDeTaiId");

            migrationBuilder.CreateIndex(
                name: "IX_DeTai_DonViChuTriId",
                table: "DeTai",
                column: "DonViChuTriId");

            migrationBuilder.CreateIndex(
                name: "IX_HoatDong_LoaiHoatDongId",
                table: "HoatDong",
                column: "LoaiHoatDongId");

            migrationBuilder.CreateIndex(
                name: "IX_Role_Name",
                table: "Role",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_DonViId",
                table: "User",
                column: "DonViId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "User",
                column: "Email");

            migrationBuilder.CreateIndex(
                name: "IX_User_MaVienChuc",
                table: "User",
                column: "MaVienChuc");

            migrationBuilder.CreateIndex(
                name: "IX_User_SoDienThoai",
                table: "User",
                column: "SoDienThoai");

            migrationBuilder.CreateIndex(
                name: "IX_User_Username",
                table: "User",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                table: "UserRole",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CongBo");

            migrationBuilder.DropTable(
                name: "DeTai");

            migrationBuilder.DropTable(
                name: "HoatDong");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "NoiDangBao");

            migrationBuilder.DropTable(
                name: "ThanhQua");

            migrationBuilder.DropTable(
                name: "CapDeTai");

            migrationBuilder.DropTable(
                name: "DonViChuTri");

            migrationBuilder.DropTable(
                name: "LoaiHoatDong");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "DonVi");
        }
    }
}
