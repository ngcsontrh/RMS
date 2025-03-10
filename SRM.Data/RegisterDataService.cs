using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data
{
    public static class RegisterDataService
    {
        public static void AddDataServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(connectionString)
                    .EnableSensitiveDataLogging();
            });

            var assembly = Assembly.GetAssembly(typeof(RegisterDataService));
            var classes = assembly!.ExportedTypes.Where(c => !c.IsInterface && c.Name.EndsWith("Repository")).ToList();
            foreach (Type @class in classes)
            {
                foreach (var @interface in @class.GetInterfaces())
                {
                    services.AddScoped(@interface, @class);
                }
            }
        }
    }
}
