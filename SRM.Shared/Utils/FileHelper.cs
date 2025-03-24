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
            string[] parts = base64.Split(';');
            string extension = parts[0].Split('/')[1];
            string base64String = parts[1].Split(',')[1];

            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "storage", fileFolder);

            if (!Directory.Exists(uploadsPath))
            {
                Directory.CreateDirectory(uploadsPath);
            }
            
            byte[] fileBytes = Convert.FromBase64String(base64String);

            string fileName = ObjectExtension.GenerateFileName();

            if (!string.IsNullOrEmpty(extension))
            {
                extension = extension.TrimStart('.');
                fileName = $"{fileName}.{extension}";
            }

            string filePath = Path.Combine(uploadsPath, fileName);
            File.WriteAllBytes(filePath, fileBytes);

            return Path.Combine("storage", fileFolder, fileName);
        }

    }
}
