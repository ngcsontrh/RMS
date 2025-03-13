import React, { useState } from "react";

const DangNhap = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form" onSubmit={handleSubmit}>
              <span className="login100-form-title p-b-26">Welcome</span>
              <span className="login100-form-title p-b-48">
              <div className="logo-container">
                <img src="/images/icons/tlu_logo.png" className="logo" alt="tlu"/>
              </div>
            </span>

              {/* Email Input */}
              <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                <input
                    className={`input100 ${email ? "has-val" : ""}`}
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span className="focus-input100 txt1" data-placeholder="Tên đăng nhập"></span>
              </div>

              {/* Password Input */}
              <div className="wrap-input100 validate-input" data-validate="Enter password">
              <span className="btn-show-pass" onClick={() => setShowPassword(!showPassword)}>
                <i className={`zmdi ${showPassword ? "zmdi-eye-off" : "zmdi-eye"}`}></i>
              </span>
                <input
                    className={`input100 ${password ? "has-val" : ""}`}
                    type={showPassword ? "text" : "password"}
                    name="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="focus-input100 txt1" data-placeholder="Mật khẩu"></span>
              </div>

              {/* Submit Button */}
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn" type="submit">
                    Login
                  </button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center p-t-115">
                <span className="txt1">Chưa có tài khoản? </span>
                <a className="txt2" href="#">
                  <u>Đăng ký</u>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="dropDownSelect1"></div>
      </div>
  );
};

export default DangNhap;
