using FluentValidation;
using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Utils.Validators
{
    public class RegisterDataValidator : AbstractValidator<RegisterData>
    {
        public RegisterDataValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("Tên đăng nhập không được để trống.")
                .MinimumLength(8).WithMessage("Tên đăng nhập phải có ít nhất 8 ký tự.")
                .MaximumLength(255).WithMessage("Tên đăng nhập không được vượt quá 255 ký tự.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Mật khẩu không được để trống.")
                .MinimumLength(8).WithMessage("Mật khẩu phải có ít nhất 8 ký tự.")
                .MaximumLength(255).WithMessage("Mật khẩu không được vượt quá 255 ký tự.");

            RuleFor(x => x.RoleName)
                .NotEmpty().WithMessage("Vai trò không được để trống.")
                .MaximumLength(255).WithMessage("Vai trò không được vượt quá 255 ký tự.");
        }
    }
}
