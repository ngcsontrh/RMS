import React, { useState } from "react";
import { Pagination } from "antd";

const QuyChe: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Thiết lập chiều cao tối thiểu để đảm bảo hai trang có độ cao tương đồng
    const contentStyle = {
        minHeight: "500px", // Đảm bảo chiều cao tương đương nhau
    };

    // Nội dung của trang 1 (Quy chế)
    const quyCheContent = (
        <div style={contentStyle}>
            <h2 style={{ marginBottom: "20px" }}>
                Quyết định số 231/QĐ-ĐHTL ngày 18/3/2021 về việc tổ chức thực hiện đề tài NCKH trọng điểm Trường Đại học Thủy lợi
            </h2>
            <p>Quy định này quy định việc tổ chức thực hiện đề tài nghiên cứu khoa học trọng điểm Trường Đại học Thủy lợi.</p>

            <h3>1. Thời gian thực hiện</h3>
            <p>Tối đa không quá 18 tháng đồng thời đã thực hiện được ít nhất 6 tháng kể từ khi ký hợp đồng.</p>

            <h3>2. Kết quả bắt buộc</h3>
            <p>
                Đề tài phải công bố ít nhất 01 bài báo trên tạp chí khoa học chuyên ngành quốc tế có uy tín thuộc danh mục ISI
                bao gồm SCIE và SSCI (theo danh mục được Bộ Khoa học và Công nghệ công bố hoặc được Hội đồng Khoa học công nghệ của
                Trường Đại học Thủy lợi công nhận) và 01 bài báo trong số tiếng Anh của Tạp chí Khoa học kỹ thuật Thủy lợi và Môi trường.
            </p>

            <h3>3. Kinh phí đề tài</h3>
            <p>Tối đa 120 triệu (kinh phí theo từng mức tương ứng với kết quả của bài báo công bố quốc tế).</p>

            <h3>Nội dung Quyết định</h3>
            <p>Download nội dung chi tiết tại đây:</p>
            <a href="/files/QD231.pdf" download style={{ fontSize: "16px", fontWeight: "bold", color: "#007bff", textDecoration: "none" }}>
                📄 QĐ231.pdf
            </a>
        </div>
    );

    // Nội dung của trang 2 (Quyết định)
    const quyDinhContent = (
        <div style={contentStyle}>
            <h2 style={{ marginBottom: "20px" }}>Quyết định số 288/QĐ-ĐHTL ngày 14/4/2020</h2>
            <p>
                Quy chế này quy định tiêu chí, thủ tục, chế độ ưu đãi cho các nhóm nghiên cứu với mục tiêu hướng tới các sản phẩm đầu ra rõ ràng về số lượng bài báo quốc tế uy tín, số lượng bằng độc quyền sáng chế và số lượng bằng độc quyền giải pháp hữu ích.
                Nội dung Quy chế download <a href="#">Tại đây</a>.
            </p>

            <div style={{ height: "50px" }}></div>

            <h2 style={{ marginBottom: "20px" }}>Quyết định số 255/QĐ-ĐHTL ngày 30/3/2021</h2>
            <p>
                Quy định này quy định về hỗ trợ kinh phí cho CBGV thuộc biên chế của Trường Đại học Thuỷ lợi tham dự hội nghị, hội thảo trong nước và quốc tế hoặc có các bài báo khoa học đã được công bố quốc tế, văn bằng sở hữu trí tuệ trong năm.
            </p>
            <p>
                Nội dung Quyết định download <a href="https://drive.google.com/file/d/1Jv1FggLHUeM4pbT1Eu_QxoMSF6tUzeam/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                    Tại đây
                </a>
            </p>

            <div style={{ height: "50px" }}></div>
        </div>
    );

    return (
        <div>
            {/* Nội dung chính */}
            <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px", background: "#f5f5f5", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                {currentPage === 1 ? quyCheContent : quyDinhContent}
            </div>

            {/* Phân trang tách riêng bên ngoài */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Pagination
                    current={currentPage}
                    total={2} // 2 trang
                    pageSize={1}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default QuyChe;
