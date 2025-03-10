﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException() : base("The specific item was not found.") { }
        public NotFoundException(string message) : base(message) { }
    }
}
