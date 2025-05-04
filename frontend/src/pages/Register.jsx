import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import sportsMsLogo from "../assets/sportsMsLogo.png";
import googleLogo from "../assets/googleLogo.jpg";
import facebookLogo from "../assets/facebookLogo.jpg";
import appleLogo from "../assets/appleLogo.jpg";
import { useDispatch } from "react-redux";
import { register } from "../Redux/Auth/actions";
import { Form, Input, Button, Select } from "antd";
import { countryList } from "../utils/countryList";

const { Option } = Select;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = (values) => {
    dispatch(register({ registerData: values }));
    navigate("/");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-illustration">
          <img
            src={sportsMsLogo}
            alt="Registration illustration"
            className="illustration-image"
          />
        </div>

        <div className="register-form-container">
          <h1 className="register-title">Register</h1>

          <Form
            layout="vertical"
            onFinish={onFinish}
            className="register-form"
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
              className="form-group"
            >
              <Input
                placeholder="Enter your full name"
                className="input-text"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Invalid email format" },
                { required: true, message: "Email is required" },
              ]}
              className="form-group"
            >
              <Input
                placeholder="Enter your email"
                className="input-text"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                {
                  min: 6,
                  message: "Minimum 6 characters",
                },
              ]}
              className="form-group"
            >
              <div className="password-input-container">
                <Input.Password
                  placeholder="Create a password"
                  className="input-text"
                  iconRender={visible =>
                    visible ? <EyeOff size={20} /> : <Eye size={20} />
                  }
                  visibilityToggle={{ visible: showPassword, onVisibleChange: togglePasswordVisibility }}
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Country is required" }]}
              className="form-group"
            >
              <Select placeholder="Select your country" className="input-text">
                {countryList.map((item) => (
                  <Option key={item.value} value={item.value} label={item.label}>
                    {item?.icon && item?.icon + ' '}
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Button htmlType="submit" className="register-button">
              Create Account
            </Button>
          </Form>

          <div className="social-divider">
            <span className="divider-line"></span>
            <span className="divider-text">Or Continue With</span>
            <span className="divider-line"></span>
          </div>

          <div className="social-login">
            <button className="social-button google">
              <img src={googleLogo} alt="Google" className="googleLogo" />
            </button>
            <button className="social-button facebook">
              <a href="#">
                <img src={facebookLogo} alt="Facebook" className="facebookLogo" />
              </a>
            </button>
            <button className="social-button apple">
              <img src={appleLogo} alt="Apple" className="appleLogo" />
            </button>
          </div>

          <p className="login-link">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
