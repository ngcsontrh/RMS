using Microsoft.AspNetCore.Hosting.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Utils
{
    public class GlobalConstraint
    {
        public const string Permission = "permission";
        public const string AddSuccessful = "Thêm dữ liệu thành công.";
        public const string AddFailed = "Thêm dữ liệu thất bại.";
        public const string UpdateSuccessful = "Cập nhật dữ liệu thành công.";
        public const string UpdateFailed = "Cập nhật dữ liệu thất bại.";
        public const string DeleteSuccessful = "Xóa dữ liệu thành công.";
        public const string DeleteFailed = "Xóa dữ liệu thất bại.";
        public const string Success = "Yêu cầu đã được xử lý thành công.";
        public const string GeneralError = "Đã có lỗi xảy ra, vui lòng thử lại sau.";
        public const string Unauthorized = "Bạn không có quyền thực hiện hành động này.";
        public const string InvalidData = "Dữ liệu bạn gửi không hợp lệ.";
        public const string NotFound = "Không tìm thấy tài nguyên yêu cầu.";
        public const string LoginSuccessful = "Đăng nhập thành công.";
        public const string RegisterSuccessful = "Đăng ký tài khoản thành công";
        public const string InvalidCredentials = "Tên đăng nhập hoặc mật khẩu không đúng.";
        public const string InvalidRefreshToken = "Refresh token không hợp lệ.";
    }
}
