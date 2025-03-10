using FluentValidation;
using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Utils.Validators
{
    public class DeTaiValidator : AbstractValidator<DeTaiData>
    {
        public DeTaiValidator()
        {
            RuleFor(x => x.CapDeTaiId)
                .GreaterThan(0).WithMessage("Cấp đề tài ID phải lớn hơn 0.");

            RuleFor(x => x.Ten)
                .NotEmpty().WithMessage("Tên không được để trống.")
                .MaximumLength(255).WithMessage("Tên không được vượt quá 255 ký tự.");

            RuleFor(x => x.MaSo)
                .NotEmpty().WithMessage("Mã số không được để trống.")
                .MaximumLength(100).WithMessage("Mã số không được vượt quá 100 ký tự.");

            RuleFor(x => x.MucTieu)
                .NotEmpty().WithMessage("Mục tiêu không được để trống.");

            RuleFor(x => x.NoiDung)
                .NotEmpty().WithMessage("Nội dung không được để trống.");

            RuleFor(x => x.TongKinhPhi)
                .GreaterThanOrEqualTo(0).WithMessage("Tổng kinh phí không được âm.");

            RuleFor(x => x.NgayBatDau)
                .LessThan(x => x.NgayKetThuc).WithMessage("Ngày bắt đầu phải trước ngày kết thúc.");
        }
    }
}
