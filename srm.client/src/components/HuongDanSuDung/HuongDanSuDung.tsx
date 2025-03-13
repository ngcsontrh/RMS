import React from "react";

const HuongDan: React.FC = () => {
    return (
        <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px", background: "#f5f5f5", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>HƯỚNG DẪN SỬ DỤNG PHẦN MỀM</h2>
            <h3>QUẢN LÝ KHOA HỌC CÔNG NGHỆ</h3>

            <h3>I. MỤC TIÊU</h3>
            <p>Phần mềm quản lý khoa học công nghệ Trường Đại học Thủy lợi được thiết kế với mục đích hỗ trợ quản lý các hoạt động khoa học công nghệ, cụ thể:</p>
            <ul style={{ paddingLeft: "20px" }}>
                <li>Quản lý các dữ liệu khoa học công nghệ</li>
                <li>Hỗ trợ xác định khối lượng nghiên cứu khoa học</li>
                <li>Hỗ trợ xác định hỗ trợ công bố quốc tế</li>
                <li>Hỗ trợ thống kê dữ liệu về khoa học công nghệ phục vụ công tác quản lý</li>
            </ul>

            <h3>II. HƯỚNG DẪN SỬ DỤNG</h3>
            <p>
                Tất cả các cán bộ giảng viên của trường đều được cấp 1 tài khoản (account) để truy cập và sử dụng phần mềm.
                Tên tài khoản (user name) được mặc định trùng với username truy cập vào lịch công tác của Nhà trường, password được mặc định là 123456.
                Người sử dụng phải đổi mật khẩu và bổ sung dữ liệu cá nhân ngay ở lần truy cập đầu tiên.
                Cán bộ giáo viên chưa có tài khoản sử dụng phần mềm xin vui lòng liên hệ với phòng KHCN để được cấp tài khoản bổ sung.
            </p>

            <p><strong>Link truy cập phần mềm:</strong> <a href="http://khcn.tlu.edu.vn/" target="_blank" rel="noopener noreferrer">http://khcn.tlu.edu.vn/</a></p>

            <h3>2.1. Quy chế, quy định KHCN</h3>
            <p>
                Cập nhật các Quy chế, quy định khoa học công nghệ của các đơn vị quản lý nhà nước, đơn vị hoạt động khoa học công nghệ trong và ngoài nước, các văn bản pháp luật, v.v.
                Tất cả người dùng đều truy cập được vào mục này.
            </p>

            <h3>2.2. Dữ liệu toàn Trường</h3>
            <p>
                Mục này sẽ hiển thị tất cả các dữ liệu về khoa học công nghệ của Nhà trường.
                Các dữ liệu này được bố cục thành 3 nhóm: Đề tài nghiên cứu khoa học, bài báo công bố, và các hoạt động khoa học công nghệ liên quan.
            </p>
            <p>
                Tất cả người dùng đều truy cập được vào mục này. Tuy nhiên, tùy theo loại tài khoản, người dùng có thể xem dữ liệu từ cơ bản đến chi tiết.
                Ví dụ, người dùng ngoài trường chỉ có thể xem thông tin cơ bản. Mức độ chi tiết dữ liệu của từng tài khoản do Ban Giám Hiệu quyết định.
            </p>

            <h3>2.3. Dữ liệu cá nhân</h3>
            <p>Để truy cập và sử dụng mục này, người dùng phải đăng nhập vào phần mềm.</p>
            <p>
                Sau khi đăng nhập, mục này sẽ hiển thị 4 mục con:
                <ul style={{ paddingLeft: "20px" }}>
                    <li><strong>Hướng dẫn sử dụng:</strong> Cung cấp thông tin hướng dẫn cách nhập dữ liệu cá nhân.</li>
                    <li><strong>Nhập dữ liệu:</strong> Cho phép người dùng cập nhật dữ liệu khoa học cá nhân.</li>
                    <li><strong>Kết quả:</strong> Hiển thị kết quả nghiên cứu của cá nhân.</li>
                    <li><strong>Quy định tính:</strong> Quy định về cách tính điểm nghiên cứu khoa học.</li>
                </ul>
            </p>

            <h3>2.3.2. Nhập dữ liệu</h3>
            <p>
                Tất cả cán bộ giáo viên có trách nhiệm cập nhật các dữ liệu khoa học cá nhân để phục vụ công tác quản lý của Nhà trường.
            </p>
            <p>
                Trong mục <strong>Nhập dữ liệu</strong>, dữ liệu được chia thành 3 loại:
            </p>
            <ul style={{ paddingLeft: "20px" }}>
                <li><strong>Nhập đề tài:</strong> Cập nhật thông tin đề tài nghiên cứu khoa học.</li>
                <li><strong>Nhập công bố:</strong> Cập nhật thông tin bài báo khoa học.</li>
                <li><strong>Nhập hoạt động khác:</strong> Cập nhật thông tin các hoạt động khoa học liên quan.</li>
            </ul>

            <p><strong>Ví dụ về nhập đề tài:</strong></p>
            <ul style={{ paddingLeft: "20px" }}>
                <li>Cấp đề tài: Lựa chọn cấp đề tài theo danh sách có sẵn.</li>
                <li>Tên đề tài: Theo đề cương được phê duyệt.</li>
                <li>Mã số: Theo đề cương hoặc ghi "Không có".</li>
                <li>Mục tiêu, nội dung chính, kinh phí: Theo đề cương được duyệt.</li>
                <li>Thời gian bắt đầu/kết thúc: Theo đề cương được duyệt.</li>
                <li>Hồ sơ thẩm định, nghiệm thu: Tải lên các giấy tờ liên quan.</li>
            </ul>
        </div>
    );
};

export default HuongDan;
