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

            RuleFor(x => x.TenNoiDangBao)
                .NotEmpty().WithMessage("Tên nơi đăng báo không được để trống.")
                .MaximumLength(255).WithMessage("Tên nơi đăng báo không được vượt quá 255 ký tự.");

            RuleFor(x => x.NgayCongBo)
                .NotEmpty().WithMessage("Ngày công bố không được để trống.");

            RuleFor(x => x.Trang)
                .NotEmpty().WithMessage("Trang không được để trống.")
                .MaximumLength(50).WithMessage("Trang không được vượt quá 50 ký tự.");

            RuleFor(x => x.DiemHoiDong)
                .GreaterThanOrEqualTo(0).WithMessage("Điểm hội đồng không được âm.");

            RuleFor(x => x.TenHoiDong)
                .NotEmpty().WithMessage("Tên hội đồng không được để trống.")
                .MaximumLength(255).WithMessage("Tên hội đồng không được vượt quá 255 ký tự.");

            RuleFor(x => x.LoaiHoTroChiPhi)
                .NotEmpty().WithMessage("Loại hỗ trợ chi phí không được để trống.")
                .MaximumLength(255).WithMessage("Loại hỗ trợ chi phí không được vượt quá 255 ký tự.");
        }
    }
}
