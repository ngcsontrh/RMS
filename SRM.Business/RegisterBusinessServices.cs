using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace SRM.Business
{
    public static class RegisterBusinessServices
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetAssembly(typeof(RegisterBusinessServices));
            var classes = assembly!.ExportedTypes.Where(a => !a.IsInterface && a.Name.EndsWith("Service")).ToList();

            foreach (Type @class in classes)
            {
                foreach (var @interface in @class.GetInterfaces())
                {
                    services.AddScoped(@interface, @class);
                }
            }

            return services;
        }
    }
}
