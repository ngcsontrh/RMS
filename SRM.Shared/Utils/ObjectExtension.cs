using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Utils
{
    public static class ObjectExtension
    {
        public static string GenerateFileName()
        {
            return $"{Guid.NewGuid().ToString("N")}_{DateTime.Now:yyyyMMddHHmmss}";
        }
    }
}
