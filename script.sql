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
    [Id] uniqueidentifier NOT NULL,
    [Ten] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_CapDeTai] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [DonVi] (
    [Id] uniqueidentifier NOT NULL,
    [Ten] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_DonVi] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [DonViChuTri] (
    [Id] uniqueidentifier NOT NULL,
    [Ten] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_DonViChuTri] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [LoaiHoatDong] (
    [Id] uniqueidentifier NOT NULL,
    [Ten] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_LoaiHoatDong] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [NoiDangBao] (
    [Id] uniqueidentifier NOT NULL,
    [Ten] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_NoiDangBao] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Role] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(450) NOT NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_Role] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [ThanhQua] (
    [Id] uniqueidentifier NOT NULL,
    [Ten] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_ThanhQua] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [User] (
    [Id] uniqueidentifier NOT NULL,
    [Username] nvarchar(450) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    [Email] nvarchar(450) NULL,
    [SoDienThoai] nvarchar(450) NULL,
    [HoTen] nvarchar(max) NULL,
    [MaVienChuc] nvarchar(450) NULL,
    [GioiTinh] nvarchar(max) NULL,
    [DonViId] uniqueidentifier NULL,
    [NgaySinh] datetime2 NULL,
    [DanToc] nvarchar(max) NULL,
    [ChucDanh] nvarchar(max) NULL,
    [ChuyenNganh] nvarchar(max) NULL,
    [HocVi] nvarchar(max) NULL,
    [TruongDH] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_User_DonVi_DonViId] FOREIGN KEY ([DonViId]) REFERENCES [DonVi] ([Id])
);
GO

CREATE TABLE [DeTai] (
    [Id] uniqueidentifier NOT NULL,
    [CapDeTaiId] uniqueidentifier NULL,
    [Ten] nvarchar(max) NULL,
    [MaSo] nvarchar(max) NULL,
    [MucTieu] nvarchar(max) NULL,
    [NoiDung] nvarchar(max) NULL,
    [TongKinhPhi] decimal(18,2) NULL,
    [NgayBatDau] datetime2 NULL,
    [NgayKetThuc] datetime2 NULL,
    [KinhPhiHangNam] decimal(18,2) NULL,
    [HoSoNghiemThu] nvarchar(max) NULL,
    [HoSoSanPham] nvarchar(max) NULL,
    [DonViChuTriId] uniqueidentifier NULL,
    [ChuNhiem] nvarchar(max) NULL,
    [CanBoThamGias] nvarchar(max) NULL,
    [PhanChiaSuDongGop] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_DeTai] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_DeTai_CapDeTai_CapDeTaiId] FOREIGN KEY ([CapDeTaiId]) REFERENCES [CapDeTai] ([Id]),
    CONSTRAINT [FK_DeTai_DonViChuTri_DonViChuTriId] FOREIGN KEY ([DonViChuTriId]) REFERENCES [DonViChuTri] ([Id])
);
GO

CREATE TABLE [HoatDong] (
    [Id] uniqueidentifier NOT NULL,
    [LoaiHoatDongId] uniqueidentifier NULL,
    [Ten] nvarchar(max) NULL,
    [NoiDung] nvarchar(max) NULL,
    [GhiChu] nvarchar(max) NULL,
    [DiaChi] nvarchar(max) NULL,
    [KinhPhi] decimal(18,2) NULL,
    [SoTrang] int NULL,
    [SoTiet] int NULL,
    [FileDinhKem] nvarchar(max) NULL,
    [NgayBatDau] datetime2 NULL,
    [NgayKetThuc] datetime2 NULL,
    [DuongDan] nvarchar(max) NULL,
    [ChuNhiem] nvarchar(max) NULL,
    [ThanhVienThamGias] nvarchar(max) NULL,
    [PhanChiaSuDongGop] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_HoatDong] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_HoatDong_LoaiHoatDong_LoaiHoatDongId] FOREIGN KEY ([LoaiHoatDongId]) REFERENCES [LoaiHoatDong] ([Id])
);
GO

CREATE TABLE [CongBo] (
    [Id] uniqueidentifier NOT NULL,
    [NoiDangBaoId] uniqueidentifier NULL,
    [LinkMinhChungTapChi] nvarchar(max) NULL,
    [Ten] nvarchar(max) NULL,
    [DiaDiem] nvarchar(max) NULL,
    [TenTapChi] nvarchar(max) NULL,
    [NhaXuatBan] nvarchar(max) NULL,
    [FileMinhChungBaiBao] nvarchar(max) NULL,
    [LinkBaiBao] nvarchar(max) NULL,
    [NgayGuiDang] datetime2 NULL,
    [NgayCongBo] datetime2 NULL,
    [ChiSoTacDong] decimal(18,2) NULL,
    [Ky] int NULL,
    [Tap] int NULL,
    [Trang] nvarchar(max) NULL,
    [DiemHoiDong] decimal(18,2) NULL,
    [TenHoiDong] nvarchar(max) NULL,
    [LoaiQ] nvarchar(max) NULL,
    [ThanhQuaId] uniqueidentifier NULL,
    [LinkMinhChungLoaiQ] nvarchar(max) NULL,
    [TacGiaChinh] nvarchar(max) NULL,
    [TacGiaLienHe] nvarchar(max) NULL,
    [DongTacGias] nvarchar(max) NULL,
    [LoaiHoTroChiPhi] nvarchar(max) NULL,
    [PhanChiaSuDongGop] nvarchar(max) NULL,
    [NgayTao] datetime2 NULL,
    [NgaySua] datetime2 NULL,
    CONSTRAINT [PK_CongBo] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CongBo_NoiDangBao_NoiDangBaoId] FOREIGN KEY ([NoiDangBaoId]) REFERENCES [NoiDangBao] ([Id]),
    CONSTRAINT [FK_CongBo_ThanhQua_ThanhQuaId] FOREIGN KEY ([ThanhQuaId]) REFERENCES [ThanhQua] ([Id])
);
GO

CREATE TABLE [UserRole] (
    [UserId] uniqueidentifier NOT NULL,
    [RoleId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_UserRole] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_UserRole_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserRole_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'NgaySua', N'NgayTao') AND [object_id] = OBJECT_ID(N'[Role]'))
    SET IDENTITY_INSERT [Role] ON;
INSERT INTO [Role] ([Id], [Name], [NgaySua], [NgayTao])
VALUES ('00000000-0000-0000-0000-000000000001', N'Admin', NULL, NULL);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'NgaySua', N'NgayTao') AND [object_id] = OBJECT_ID(N'[Role]'))
    SET IDENTITY_INSERT [Role] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ChucDanh', N'ChuyenNganh', N'DanToc', N'DonViId', N'Email', N'GioiTinh', N'HoTen', N'HocVi', N'MaVienChuc', N'NgaySinh', N'NgaySua', N'NgayTao', N'Password', N'SoDienThoai', N'TruongDH', N'Username') AND [object_id] = OBJECT_ID(N'[User]'))
    SET IDENTITY_INSERT [User] ON;
INSERT INTO [User] ([Id], [ChucDanh], [ChuyenNganh], [DanToc], [DonViId], [Email], [GioiTinh], [HoTen], [HocVi], [MaVienChuc], [NgaySinh], [NgaySua], [NgayTao], [Password], [SoDienThoai], [TruongDH], [Username])
VALUES ('00000000-0000-0000-0000-000000000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'AQAAAAIAAYagAAAAENKmRj5jqegps3RqNwm9hCkccpMsKxFAP7p4ty/6/pZLIpwIiecVJv/cnGIQP/3PBQ==', NULL, NULL, N'admin');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'ChucDanh', N'ChuyenNganh', N'DanToc', N'DonViId', N'Email', N'GioiTinh', N'HoTen', N'HocVi', N'MaVienChuc', N'NgaySinh', N'NgaySua', N'NgayTao', N'Password', N'SoDienThoai', N'TruongDH', N'Username') AND [object_id] = OBJECT_ID(N'[User]'))
    SET IDENTITY_INSERT [User] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'RoleId', N'UserId') AND [object_id] = OBJECT_ID(N'[UserRole]'))
    SET IDENTITY_INSERT [UserRole] ON;
INSERT INTO [UserRole] ([RoleId], [UserId])
VALUES ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'RoleId', N'UserId') AND [object_id] = OBJECT_ID(N'[UserRole]'))
    SET IDENTITY_INSERT [UserRole] OFF;
GO

CREATE INDEX [IX_CongBo_NoiDangBaoId] ON [CongBo] ([NoiDangBaoId]);
GO

CREATE INDEX [IX_CongBo_ThanhQuaId] ON [CongBo] ([ThanhQuaId]);
GO

CREATE INDEX [IX_DeTai_CapDeTaiId] ON [DeTai] ([CapDeTaiId]);
GO

CREATE INDEX [IX_DeTai_DonViChuTriId] ON [DeTai] ([DonViChuTriId]);
GO

CREATE INDEX [IX_HoatDong_LoaiHoatDongId] ON [HoatDong] ([LoaiHoatDongId]);
GO

CREATE UNIQUE INDEX [IX_Role_Name] ON [Role] ([Name]);
GO

CREATE INDEX [IX_User_DonViId] ON [User] ([DonViId]);
GO

CREATE INDEX [IX_User_Email] ON [User] ([Email]);
GO

CREATE INDEX [IX_User_MaVienChuc] ON [User] ([MaVienChuc]);
GO

CREATE INDEX [IX_User_SoDienThoai] ON [User] ([SoDienThoai]);
GO

CREATE UNIQUE INDEX [IX_User_Username] ON [User] ([Username]);
GO

CREATE INDEX [IX_UserRole_RoleId] ON [UserRole] ([RoleId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250408014552_Initial', N'8.0.14');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [DeTai] ADD [NguoiDeXuatId] uniqueidentifier NULL;
GO

ALTER TABLE [DeTai] ADD [TrangThaiPheDuyet] nvarchar(max) NULL;
GO

CREATE INDEX [IX_DeTai_NguoiDeXuatId] ON [DeTai] ([NguoiDeXuatId]);
GO

ALTER TABLE [DeTai] ADD CONSTRAINT [FK_DeTai_User_NguoiDeXuatId] FOREIGN KEY ([NguoiDeXuatId]) REFERENCES [User] ([Id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250409042205_AddDeTaiColumns', N'8.0.14');
GO

COMMIT;
GO

