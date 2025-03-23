using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Utils
{
    public static class FileHelper
    {
        public static string SaveBase64File(string base64, string fileFolder)
        {
            // Tách phần extension và phần base64
            string[] parts = base64.Split(';');
            string extension = parts[0].Split('/')[1];
            string base64String = parts[1].Split(',')[1];

            // Xác định đường dẫn lưu file trong thư mục storage
            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "storage", fileFolder);

            // Tạo thư mục nếu chưa tồn tại
            if (!Directory.Exists(uploadsPath))
            {
                Directory.CreateDirectory(uploadsPath);
            }

            // Giải mã base64 thành byte[]
            byte[] fileBytes = Convert.FromBase64String(base64String);

            // Tạo tên file ngẫu nhiên
            string fileName = ObjectExtension.GenerateFileName();

            // Gắn phần mở rộng vào tên file nếu có
            if (!string.IsNullOrEmpty(extension))
            {
                extension = extension.TrimStart('.');
                fileName = $"{fileName}.{extension}";
            }

            // Đường dẫn tuyệt đối đến file (không cần trả về)
            string filePath = Path.Combine(uploadsPath, fileName);

            // Lưu file vào thư mục
            File.WriteAllBytes(filePath, fileBytes);

            // Trả về đường dẫn tương đối của file
            return Path.Combine("storage", fileFolder, fileName); // Đường dẫn tương đối (không có "storage")
        }

    }
}
