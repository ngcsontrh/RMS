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
        public static readonly string InternalServerError = "Internal Server Error";
        public static readonly string BadRequest = "Bad Request";
        public static readonly string InternalServerErrorMessage = "Xảy ra lỗi trong quá trình xử lý";
        public static readonly string NotFoundMessage = "Dữ liệu không tồn tại";
    }
}
