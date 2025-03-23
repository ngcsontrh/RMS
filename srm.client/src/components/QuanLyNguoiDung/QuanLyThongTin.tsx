// QuanLyThongTin.tsx
import React from "react";
import { Breadcrumb, Card, Typography } from "antd";
import UserProfile from "./UserProfile"; // Import component UserProfile
import QuanLyLyLich from "./QuanLyLyLich";
import QuanLyCongTac from "./QuanLyCongTac";

const { Title } = Typography;

interface QuanLyThongTinProps {
    userData: any;
}

const QuanLyThongTin: React.FC<QuanLyThongTinProps> = ({ userData }) => {
    const onFinish = (values: any) => {
        // Logic xử lý cập nhật thông tin
        console.log("Cập nhật thông tin:", values);
        // Bạn có thể giữ logic gọi API ở đây nếu cần
    };

    return (
        <>
            <Breadcrumb style={{ marginTop: "10px" }} items={[{ title: "Quản lý người dùng" }, { title: "Thông tin người dùng" }]} />
            <Card style={{ maxWidth: 1200, margin: "auto", padding: 20, marginTop: "20px" }}>
                <Title level={3} style={{ textAlign: "center" }}>
                    THÔNG TIN CÁ NHÂN
                </Title>
                <UserProfile userData={userData} onFinish={onFinish} />
            </Card>
            <Card style={{ maxWidth: 1200, margin: "auto", padding: 20, marginTop: "20px" }}>
                <Title level={3} style={{ textAlign: "center" }}>
                    THÔNG TIN LÝ LỊCH KHOA HỌC
                </Title>
                <QuanLyLyLich />
            </Card>
            <Card style={{ maxWidth: 1200, margin: "auto", padding: 20, marginTop: "20px" }}>
                <Title level={3} style={{ textAlign: "center" }}>
                    QUÁ TRÌNH CÔNG TÁC
                </Title>
                <QuanLyCongTac />
            </Card>
        </>
    );
};

export default QuanLyThongTin;