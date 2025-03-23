using FluentValidation;
using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Utils.Validators
{
    public class LoginDataValidator : AbstractValidator<LoginData>
    {
        public LoginDataValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .WithMessage("Tên đăng nhập không được để trống");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Mật khẩu không được để trống");
        }
    }
}
