import React from "react";

const LienHe: React.FC = () => {
    return (
        <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", background: "#f5f5f5", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Thông tin liên hệ</h2>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>Mọi chi tiết xin gửi về</p>
            <p><strong>Địa chỉ:</strong> Phòng 504, 506, 508 - Nhà A1, Số 175 Tây Sơn - Đống Đa - Hà Nội</p>
            <p><strong>Điện thoại:</strong> 35641053; 38534198</p>
            <p><strong>Email:</strong> <a href="mailto:khcn@tlu.edu.vn">khcn@tlu.edu.vn</a></p>
        </div>
    );
};

export default LienHe;
