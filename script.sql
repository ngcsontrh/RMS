IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [CapDeTai] (
    [Id] int NOT NULL IDENTITY,
    [Ten] nvarchar(max) NOT NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_CapDeTai] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [DonVi] (
    [Id] int NOT NULL IDENTITY,
    [Ten] nvarchar(max) NOT NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_DonVi] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [DonViChuTri] (
    [Id] int NOT NULL IDENTITY,
    [Ten] nvarchar(max) NOT NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_DonViChuTri] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [LoaiHoatDong] (
    [Id] int NOT NULL IDENTITY,
    [Ten] nvarchar(max) NOT NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_LoaiHoatDong] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [NoiDangBao] (
    [Id] int NOT NULL IDENTITY,
    [Ten] nvarchar(max) NOT NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_NoiDangBao] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Role] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(256) NULL,
    [NormalizedName] nvarchar(256) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_Role] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [ThanhQua] (
    [Id] int NOT NULL IDENTITY,
    [Ten] nvarchar(max) NOT NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_ThanhQua] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [TacGia] (
    [Id] int NOT NULL IDENTITY,
    [Ten] nvarchar(max) NOT NULL,
    [MaVienChuc] nvarchar(max) NULL,
    [GioiTinh] nvarchar(max) NULL,
    [SoDienThoai] nvarchar(max) NULL,
    [Email] nvarchar(max) NULL,
    [DonViId] int NULL,
    [NgaySinh] datetime2 NULL,
    [DanToc] nvarchar(max) NULL,
    [ChucDanh] nvarchar(max) NULL,
    [ChuyenNganh] nvarchar(max) NULL,
    [HocVi] nvarchar(max) NULL,
    [TruongDH] nvarchar(max) NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_TacGia] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_TacGia_DonVi_DonViId] FOREIGN KEY ([DonViId]) REFERENCES [DonVi] ([Id])
);
GO

CREATE TABLE [RoleClaim] (
    [Id] int NOT NULL IDENTITY,
    [RoleId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_RoleClaim] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_RoleClaim_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [CongBo] (
    [Id] int NOT NULL IDENTITY,
    [NoiDangBaoId] int NOT NULL,
    [LinkMinhChungTapChi] nvarchar(max) NULL,
    [Ten] nvarchar(max) NOT NULL,
    [DiaDiem] nvarchar(max) NULL,
    [TenTapChi] nvarchar(max) NULL,
    [NhaXuatBan] nvarchar(max) NULL,
    [FileMinhChungBaiBao] nvarchar(max) NULL,
    [LinkBaiBao] nvarchar(max) NULL,
    [NgayGuiDang] datetime2 NULL,
    [NgayCongBo] datetime2 NOT NULL,
    [ChiSoTacDong] decimal(18,6) NULL,
    [Ky] int NOT NULL,
    [Tap] int NOT NULL,
    [Trang] nvarchar(max) NOT NULL,
    [DiemHoiDong] decimal(18,6) NOT NULL,
    [TenHoiDong] nvarchar(max) NOT NULL,
    [LoaiQ] nvarchar(max) NULL,
    [ThanhQuaId] int NULL,
    [LinkMinhChungLoaiQ] nvarchar(max) NULL,
    [TacGiaChinhId] int NOT NULL,
    [TacGiaLienHeId] int NULL,
    [DongTacGiaIds] varchar(max) NOT NULL,
    [LoaiHoTroChiPhi] nvarchar(max) NOT NULL,
    [PhanChiaSuDongGop] nvarchar(max) NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_CongBo] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CongBo_NoiDangBao_NoiDangBaoId] FOREIGN KEY ([NoiDangBaoId]) REFERENCES [NoiDangBao] ([Id]),
    CONSTRAINT [FK_CongBo_TacGia_TacGiaChinhId] FOREIGN KEY ([TacGiaChinhId]) REFERENCES [TacGia] ([Id]),
    CONSTRAINT [FK_CongBo_TacGia_TacGiaLienHeId] FOREIGN KEY ([TacGiaLienHeId]) REFERENCES [TacGia] ([Id]),
    CONSTRAINT [FK_CongBo_ThanhQua_ThanhQuaId] FOREIGN KEY ([ThanhQuaId]) REFERENCES [ThanhQua] ([Id])
);
GO

CREATE TABLE [DeTai] (
    [Id] int NOT NULL IDENTITY,
    [CapDeTaiId] int NOT NULL,
    [Ten] nvarchar(max) NOT NULL,
    [MaSo] nvarchar(max) NOT NULL,
    [MucTieu] nvarchar(max) NOT NULL,
    [NoiDung] nvarchar(max) NOT NULL,
    [TongKinhPhi] decimal(18,6) NOT NULL,
    [NgayBatDau] datetime2 NOT NULL,
    [NgayKetThuc] datetime2 NOT NULL,
    [KinhPhiHangNam] decimal(18,6) NULL,
    [HoSoNghiemThu] nvarchar(max) NULL,
    [HoSoSanPham] nvarchar(max) NULL,
    [DonViChuTriId] int NULL,
    [ChuNhiemId] int NOT NULL,
    [CanBoThamGiaIds] varchar(max) NOT NULL,
    [PhanChiaSuDongGop] nvarchar(max) NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_DeTai] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_DeTai_CapDeTai_CapDeTaiId] FOREIGN KEY ([CapDeTaiId]) REFERENCES [CapDeTai] ([Id]),
    CONSTRAINT [FK_DeTai_DonViChuTri_DonViChuTriId] FOREIGN KEY ([DonViChuTriId]) REFERENCES [DonViChuTri] ([Id]),
    CONSTRAINT [FK_DeTai_TacGia_ChuNhiemId] FOREIGN KEY ([ChuNhiemId]) REFERENCES [TacGia] ([Id])
);
GO

CREATE TABLE [HoatDong] (
    [Id] int NOT NULL IDENTITY,
    [LoaiHoatDongId] int NULL,
    [Ten] nvarchar(max) NOT NULL,
    [NoiDung] nvarchar(max) NULL,
    [GhiChu] nvarchar(max) NULL,
    [DiaChi] nvarchar(max) NULL,
    [KinhPhi] decimal(18,6) NULL,
    [SoTrang] int NULL,
    [SoTiet] int NULL,
    [FileDinhKem] nvarchar(max) NULL,
    [NgayBatDau] datetime2 NULL,
    [NgayKetThuc] datetime2 NOT NULL,
    [DuongDan] nvarchar(max) NULL,
    [ChuNhiemId] int NOT NULL,
    [ThanhVienThamGiaIds] nvarchar(max) NOT NULL,
    [PhanChiaSuDongGop] nvarchar(max) NULL,
    [NgayTao] datetime2 NOT NULL,
    [NgaySua] datetime2 NOT NULL,
    [NguoiTaoId] int NULL,
    [NguoiSuaId] int NULL,
    CONSTRAINT [PK_HoatDong] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_HoatDong_LoaiHoatDong_LoaiHoatDongId] FOREIGN KEY ([LoaiHoatDongId]) REFERENCES [LoaiHoatDong] ([Id]),
    CONSTRAINT [FK_HoatDong_TacGia_ChuNhiemId] FOREIGN KEY ([ChuNhiemId]) REFERENCES [TacGia] ([Id])
);
GO

CREATE TABLE [User] (
    [Id] int NOT NULL IDENTITY,
    [TacGiaId] int NULL,
    [UserName] nvarchar(256) NULL,
    [NormalizedUserName] nvarchar(256) NULL,
    [Email] nvarchar(256) NULL,
    [NormalizedEmail] nvarchar(256) NULL,
    [EmailConfirmed] bit NOT NULL,
    [PasswordHash] nvarchar(max) NULL,
    [SecurityStamp] nvarchar(max) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    [PhoneNumber] nvarchar(max) NULL,
    [PhoneNumberConfirmed] bit NOT NULL,
    [TwoFactorEnabled] bit NOT NULL,
    [LockoutEnd] datetimeoffset NULL,
    [LockoutEnabled] bit NOT NULL,
    [AccessFailedCount] int NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_User_TacGia_TacGiaId] FOREIGN KEY ([TacGiaId]) REFERENCES [TacGia] ([Id])
);
GO

CREATE TABLE [UserClaim] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_UserClaim] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserClaim_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [UserLogin] (
    [LoginProvider] nvarchar(450) NOT NULL,
    [ProviderKey] nvarchar(450) NOT NULL,
    [ProviderDisplayName] nvarchar(max) NULL,
    [UserId] int NOT NULL,
    CONSTRAINT [PK_UserLogin] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_UserLogin_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [UserRole] (
    [UserId] int NOT NULL,
    [RoleId] int NOT NULL,
    CONSTRAINT [PK_UserRole] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_UserRole_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserRole_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [UserToken] (
    [UserId] int NOT NULL,
    [LoginProvider] nvarchar(450) NOT NULL,
    [Name] nvarchar(450) NOT NULL,
    [RoleId] int NOT NULL,
    [Value] nvarchar(max) NULL,
    CONSTRAINT [PK_UserToken] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_UserToken_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserToken_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessFailedCount', N'ConcurrencyStamp', N'Email', N'EmailConfirmed', N'LockoutEnabled', N'LockoutEnd', N'NormalizedEmail', N'NormalizedUserName', N'PasswordHash', N'PhoneNumber', N'PhoneNumberConfirmed', N'SecurityStamp', N'TacGiaId', N'TwoFactorEnabled', N'UserName') AND [object_id] = OBJECT_ID(N'[User]'))
    SET IDENTITY_INSERT [User] ON;
INSERT INTO [User] ([Id], [AccessFailedCount], [ConcurrencyStamp], [Email], [EmailConfirmed], [LockoutEnabled], [LockoutEnd], [NormalizedEmail], [NormalizedUserName], [PasswordHash], [PhoneNumber], [PhoneNumberConfirmed], [SecurityStamp], [TacGiaId], [TwoFactorEnabled], [UserName])
VALUES (1, 0, NULL, N'admin123', CAST(0 AS bit), CAST(0 AS bit), NULL, NULL, NULL, N'AQAAAAIAAYagAAAAEOe4N3MEZi7wG5irdaFEbKbVhQgmM3sS7vIQIuP1bw0XHQamSc1jByD00RNZrlrQFg==', NULL, CAST(0 AS bit), NULL, NULL, CAST(0 AS bit), N'admin123');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessFailedCount', N'ConcurrencyStamp', N'Email', N'EmailConfirmed', N'LockoutEnabled', N'LockoutEnd', N'NormalizedEmail', N'NormalizedUserName', N'PasswordHash', N'PhoneNumber', N'PhoneNumberConfirmed', N'SecurityStamp', N'TacGiaId', N'TwoFactorEnabled', N'UserName') AND [object_id] = OBJECT_ID(N'[User]'))
    SET IDENTITY_INSERT [User] OFF;
GO

CREATE INDEX [IX_CongBo_NoiDangBaoId] ON [CongBo] ([NoiDangBaoId]);
GO

CREATE INDEX [IX_CongBo_TacGiaChinhId] ON [CongBo] ([TacGiaChinhId]);
GO

CREATE INDEX [IX_CongBo_TacGiaLienHeId] ON [CongBo] ([TacGiaLienHeId]);
GO

CREATE INDEX [IX_CongBo_ThanhQuaId] ON [CongBo] ([ThanhQuaId]);
GO

CREATE INDEX [IX_DeTai_CapDeTaiId] ON [DeTai] ([CapDeTaiId]);
GO

CREATE INDEX [IX_DeTai_ChuNhiemId] ON [DeTai] ([ChuNhiemId]);
GO

CREATE INDEX [IX_DeTai_DonViChuTriId] ON [DeTai] ([DonViChuTriId]);
GO

CREATE INDEX [IX_HoatDong_ChuNhiemId] ON [HoatDong] ([ChuNhiemId]);
GO

CREATE INDEX [IX_HoatDong_LoaiHoatDongId] ON [HoatDong] ([LoaiHoatDongId]);
GO

CREATE UNIQUE INDEX [RoleNameIndex] ON [Role] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
GO

CREATE INDEX [IX_RoleClaim_RoleId] ON [RoleClaim] ([RoleId]);
GO

CREATE INDEX [IX_TacGia_DonViId] ON [TacGia] ([DonViId]);
GO

CREATE INDEX [EmailIndex] ON [User] ([NormalizedEmail]);
GO

CREATE INDEX [IX_User_TacGiaId] ON [User] ([TacGiaId]);
GO

CREATE UNIQUE INDEX [UserNameIndex] ON [User] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
GO

CREATE INDEX [IX_UserClaim_UserId] ON [UserClaim] ([UserId]);
GO

CREATE INDEX [IX_UserLogin_UserId] ON [UserLogin] ([UserId]);
GO

CREATE INDEX [IX_UserRole_RoleId] ON [UserRole] ([RoleId]);
GO

CREATE INDEX [IX_UserToken_RoleId] ON [UserToken] ([RoleId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250304133031_Initial', N'8.0.13');
GO

COMMIT;
GO

