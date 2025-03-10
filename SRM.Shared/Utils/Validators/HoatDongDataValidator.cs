using FluentValidation;
using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Utils.Validators
{
    public class HoatDongDataValidator : AbstractValidator<HoatDongData>
    {
        public HoatDongDataValidator()
        {
            RuleFor(x => x.Ten)
                .NotEmpty().WithMessage("Tên không được để trống.")
                .MaximumLength(255).WithMessage("Tên không được vượt quá 255 ký tự.");

            RuleFor(x => x.KinhPhi)
                .GreaterThan(0).When(x => x.KinhPhi.HasValue).WithMessage("Kinh phí không được âm.");

            RuleFor(x => x.SoTrang)
                .GreaterThan(0).When(x => x.SoTrang.HasValue).WithMessage("Số trang không được âm.");

            RuleFor(x => x.SoTiet)
                .GreaterThan(0).When(x => x.SoTiet.HasValue).WithMessage("Số tiết không được âm.");

            RuleFor(x => x.NgayBatDau)
                .LessThan(x => x.NgayKetThuc).When(x => x.NgayBatDau.HasValue)
                .WithMessage("Ngày bắt đầu phải trước ngày kết thúc.");
        }
    }
}