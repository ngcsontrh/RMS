using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Models.Data
{
    public record ExecuteData
    {
        public bool Success { get; init; }
        public string? Message { get; init; }
        public object? Data { get; init; }
    }

    public record ExecuteData<T>
    {
        public bool Success { get; init; }
        public string? Message { get; init; }
        public T? Data { get; init; }
    }
}
