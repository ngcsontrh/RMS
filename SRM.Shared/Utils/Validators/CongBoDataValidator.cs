using FluentValidation;
using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Utils.Validators
{
    public class CongBoDataValidator : AbstractValidator<CongBoData>
    {
        public CongBoDataValidator()
        {
            RuleFor(x => x.Ten)
                .NotEmpty().WithMessage("Tên không được để trống.")
                .MaximumLength(255).WithMessage("Tên không được vượt quá 255 ký tự.");

            RuleFor(x => x.NgayCongBo)
                .NotEmpty().WithMessage("Ngày công bố không được để trống.");

            RuleFor(x => x.DiemHoiDong)
                .GreaterThanOrEqualTo(0).WithMessage("Điểm hội đồng không được âm.");            
        }
    }
}
