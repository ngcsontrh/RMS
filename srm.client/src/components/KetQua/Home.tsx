import React from "react";
import { Breadcrumb, Table } from "antd";

const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 80 },
    { title: "Tên cá nhân đề xuất", dataIndex: "tenCaNhanDeXuat", key: "tenCaNhanDeXuat", width: 200 },
    { title: "Đơn vị (Bộ môn Khoa/Phòng)", dataIndex: "donVi", key: "donVi", width: 200 },
    { title: "Thông tin liên hệ", dataIndex: "lienHe", key: "lienHe", width: 150 },
    { title: "Tên nhiệm vụ KH&CN", dataIndex: "tenNhiemVu", key: "tenNhiemVu", width: 200 },
    { title: "Lý do đề xuất", dataIndex: "lyDo", key: "lyDo", width: 200 },
    { title: "Mục tiêu", dataIndex: "mucTieu", key: "mucTieu", width: 150 },
    { title: "Yêu cầu về sản phẩm", dataIndex: "yeuCau", key: "yeuCau", width: 200 },
    { title: "Các nội dung chính cần thực hiện đề đạt kết quả", dataIndex: "noiDung", key: "noiDung", width: 250 },
    { title: "Dự kiến thời gian thực hiện", dataIndex: "thoiGianThucHien", key: "thoiGianThucHien", width: 150 },
    { title: "Dự kiến kinh phí thực hiện", dataIndex: "kinhPhiThucHien", key: "kinhPhiThucHien", width: 180 },
    { title: "Khả năng và địa chỉ áp dụng", dataIndex: "khaNang", key: "khaNang", width: 200 },
    { title: "Thời gian áp dụng", dataIndex: "thoiGian", key: "thoiGian", width: 150 },
    { title: "Bộ môn", dataIndex: "boMon", key: "boMon", width: 150 },
    { title: "Người đề xuất", dataIndex: "nguoiDeXuat", key: "nguoiDeXuat", width: 180 },
    { title: "Tùy chọn", dataIndex: "tuyChon", key: "tuyChon", width: 120 },
];

const data = Array.from({ length: 50 }, (_, index) => ({
    key: index,
    stt: index + 1,
    tenCaNhanDeXuat: `Người ${index + 1}`,
    donVi: `Đơn vị ${index + 1}`,
    lienHe: `012345678${index % 10}`,
    tenNhiemVu: `Nhiệm vụ ${index + 1}`,
    lyDo: `Lý do ${index + 1}`,
    mucTieu: `Mục tiêu ${index + 1}`,
    yeuCau: `Yêu cầu ${index + 1}`,
    noiDung: `Nội dung ${index + 1}`,
    thoiGianThucHien: `202${index % 10}-01-01`,
    kinhPhiThucHien: `${(index + 1) * 100} triệu VNĐ`,
    khaNang: `Khả năng ${index + 1}`,
    thoiGian: `Thời gian ${index + 1}`,
    boMon: `Bộ môn ${index + 1}`,
    nguoiDeXuat: `Người đề xuất ${index + 1}`,
    tuyChon: `Tùy chọn ${index + 1}`,
}));

const MyTable = () => (
    <>
        <Breadcrumb
            style={{ marginTop: "10px" }}
            items={[{ title: "Kết quả" }, { title: "Danh sách" }]}
        />
        <Table
            style={{ marginTop: "10px" }}
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1500, y: 400 }}
        />
    </>    
);

export default MyTable;
