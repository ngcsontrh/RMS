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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ten = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CapDeTai", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DonVi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ten = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonVi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DonViChuTri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ten = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonViChuTri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoaiHoatDong",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ten = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiHoatDong", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LyLichKhoaHoc",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NgaySinh = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NoiSinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QueQuan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DanToc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HocViCaoNhat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiCongNhanHocVi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChucDanhKhoaHoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NamNhanHocVi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChucVuHienTai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DienThoaiCoQuan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NganhDaiHoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiDaoTaoDaiHoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeDaoTaoDaiHoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NamTotNghiepDaiHoc = table.Column<int>(type: "int", nullable: true),
                    ChuyenNganhThacSi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiDaoTaoThacSi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NamCapBangThacSi = table.Column<int>(type: "int", nullable: true),
                    ChuyenNganhTienSi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiDaoTaoTienSi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NamCapBangTienSi = table.Column<int>(type: "int", nullable: true),
                    ChuyenNganhDaoDao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgoaiNgu1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoNgoaiNgu1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgoaiNgu2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoNgoaiNgu2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChucDanhNghienCuu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LyLichKhoaHoc", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NoiDangBao",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ten = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoiDangBao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuaTrinhCongTac",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NamBatDau = table.Column<int>(type: "int", nullable: true),
                    NamKetThuc = table.Column<int>(type: "int", nullable: true),
                    ViTriCongTac = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ToChucCongTac = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChiToChuc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuaTrinhCongTac", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ThanhQua",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ten = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThanhQua", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeTai",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CapDeTaiId = table.Column<int>(type: "int", nullable: true),
                    Ten = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    MaSo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MucTieu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NoiDung = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    TongKinhPhi = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NgayBatDau = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayKetThuc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    KinhPhiHangNam = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    HoSoNghiemThu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    HoSoSanPham = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DonViChuTriId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true),
                    ChuNhiem = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CanBoThamGias = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    PhanChiaSuDongGop = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeTai", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeTai_CapDeTai_CapDeTaiId",
                        column: x => x.CapDeTaiId,
                        principalTable: "CapDeTai",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_DeTai_DonViChuTri_DonViChuTriId",
                        column: x => x.DonViChuTriId,
                        principalTable: "DonViChuTri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "HoatDong",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LoaiHoatDongId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true),
                    Ten = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    NoiDung = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    KinhPhi = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SoTrang = table.Column<int>(type: "int", nullable: true),
                    SoTiet = table.Column<int>(type: "int", nullable: true),
                    FileDinhKem = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NgayBatDau = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayKetThuc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DuongDan = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ChuNhiem = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ThanhVienThamGia = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    PhanChiaSuDongGop = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoatDong", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HoatDong_LoaiHoatDong_LoaiHoatDongId",
                        column: x => x.LoaiHoatDongId,
                        principalTable: "LoaiHoatDong",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DonViId = table.Column<int>(type: "int", nullable: true),
                    LyLichKhoaHocId = table.Column<int>(type: "int", nullable: true),
                    QuaTrinhCongTacId = table.Column<int>(type: "int", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_DonVi_DonViId",
                        column: x => x.DonViId,
                        principalTable: "DonVi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_User_LyLichKhoaHoc_LyLichKhoaHocId",
                        column: x => x.LyLichKhoaHocId,
                        principalTable: "LyLichKhoaHoc",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_User_QuaTrinhCongTac_QuaTrinhCongTacId",
                        column: x => x.QuaTrinhCongTacId,
                        principalTable: "QuaTrinhCongTac",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RoleClaim",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaim_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CongBo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NoiDangBaoId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true),
                    LinkMinhChungTapChi = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Ten = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DiaDiem = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TenTapChi = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NhaXuatBan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    FileMinhChungBaiBao = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    LinkBaiBao = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NgayGuiDang = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayCongBo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ChiSoTacDong = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Ky = table.Column<int>(type: "int", nullable: true),
                    Tap = table.Column<int>(type: "int", nullable: true),
                    Trang = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DiemHoiDong = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TenHoiDong = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    LoaiQ = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ThanhQuaId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true),
                    LinkMinhChungLoaiQ = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    TacGiaChinh = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TacGiaLienHe = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    DongTacGias = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    LoaiHoTroChiPhi = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PhanChiaSuDongGop = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTaoId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true),
                    NguoiSuaId = table.Column<int>(type: "int", unicode: false, maxLength: 36, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CongBo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CongBo_NoiDangBao_NoiDangBaoId",
                        column: x => x.NoiDangBaoId,
                        principalTable: "NoiDangBao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_CongBo_ThanhQua_ThanhQuaId",
                        column: x => x.ThanhQuaId,
                        principalTable: "ThanhQua",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "UserClaim",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaim_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLogin",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogin", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UserLogin_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "UserToken",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserToken", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_UserToken_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserToken_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { 1, null, "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "AccessFailedCount", "Code", "ConcurrencyStamp", "CreatedDate", "DonViId", "Email", "EmailConfirmed", "FullName", "Gender", "LockoutEnabled", "LockoutEnd", "LyLichKhoaHocId", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "QuaTrinhCongTacId", "SecurityStamp", "TwoFactorEnabled", "UpdatedDate", "UserName" },
                values: new object[] { 1, 0, null, null, null, null, null, false, null, null, false, null, null, null, "ADMIN123", "AQAAAAIAAYagAAAAEEXMEGGZAfbpqnVi2Ei9taVel/ImJ2UPWjQtkwQPww9Xt7Vxv2JaclNg8M4hojbRMg==", null, false, null, null, false, null, "admin123" });

            migrationBuilder.InsertData(
                table: "UserRole",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { 1, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_CongBo_NoiDangBaoId",
                table: "CongBo",
                column: "NoiDangBaoId");

            migrationBuilder.CreateIndex(
                name: "IX_CongBo_ThanhQuaId",
                table: "CongBo",
                column: "ThanhQuaId");

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
                name: "RoleNameIndex",
                table: "Role",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_RoleClaim_RoleId",
                table: "RoleClaim",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "User",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_User_DonViId",
                table: "User",
                column: "DonViId");

            migrationBuilder.CreateIndex(
                name: "IX_User_LyLichKhoaHocId",
                table: "User",
                column: "LyLichKhoaHocId");

            migrationBuilder.CreateIndex(
                name: "IX_User_QuaTrinhCongTacId",
                table: "User",
                column: "QuaTrinhCongTacId");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "User",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserClaim_UserId",
                table: "UserClaim",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogin_UserId",
                table: "UserLogin",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                table: "UserRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserToken_RoleId",
                table: "UserToken",
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
                name: "RoleClaim");

            migrationBuilder.DropTable(
                name: "UserClaim");

            migrationBuilder.DropTable(
                name: "UserLogin");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "UserToken");

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

            migrationBuilder.DropTable(
                name: "LyLichKhoaHoc");

            migrationBuilder.DropTable(
                name: "QuaTrinhCongTac");
        }
    }
}
