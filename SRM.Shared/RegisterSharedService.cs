using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared
{
    public static class RegisterSharedService
    {
        public static void AddSharedServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetAssembly(typeof(RegisterSharedService));

            services.AddAutoMapper(assembly);
            services.AddValidatorsFromAssembly(assembly);
        }
    }
}
