using FluentValidation;
using SRM.Shared.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Shared.Utils.Validators
{
    public class TacGiaDataValidator : AbstractValidator<TacGiaData>
    {
        public TacGiaDataValidator()
        {
            RuleFor(x => x.Ten)
                .NotEmpty().WithMessage("Tên không được để trống.")
                .MaximumLength(255).WithMessage("Tên không được vượt quá 255 ký tự.");

            RuleFor(x => x.MaVienChuc)
                .MaximumLength(255).WithMessage("Mã viên chức không được vượt quá 255 ký tự.");

            RuleFor(x => x.GioiTinh)
                .MaximumLength(255).WithMessage("Giới tính không được vượt quá 255 ký tự.");

            RuleFor(x => x.SoDienThoai)
                .Matches("^[0-9]{9,15}$").When(x => !string.IsNullOrEmpty(x.SoDienThoai))
                .WithMessage("Số điện thoại không hợp lệ.");

            RuleFor(x => x.Email)
                .EmailAddress().When(x => !string.IsNullOrEmpty(x.Email))
                .WithMessage("Email không hợp lệ.");

            RuleFor(x => x.DonViId)
                .GreaterThan(0).When(x => x.DonViId.HasValue)
                .WithMessage("Đơn vị ID phải lớn hơn 0.");

            RuleFor(x => x.NgaySinh)
                .LessThanOrEqualTo(DateTime.Today).When(x => x.NgaySinh.HasValue)
                .WithMessage("Ngày sinh không được lớn hơn ngày hiện tại.");

            RuleFor(x => x.DanToc)
                .MaximumLength(255).WithMessage("Dân tộc không được vượt quá 255 ký tự.");

            RuleFor(x => x.ChucDanh)
                .MaximumLength(255).WithMessage("Chức danh không được vượt quá 255 ký tự.");

            RuleFor(x => x.ChuyenNganh)
                .MaximumLength(255).WithMessage("Chuyên ngành không được vượt quá 255 ký tự.");

            RuleFor(x => x.HocVi)
                .MaximumLength(255).WithMessage("Học vị không được vượt quá 255 ký tự.");

            RuleFor(x => x.TruongDH)
                .MaximumLength(255).WithMessage("Trường đại học không được vượt quá 255 ký tự.");
        }
    }
}
