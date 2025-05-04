import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import sportsMsLogo from "../assets/sportsMsLogo.png";
import googleLogo from "../assets/googleLogo.jpg";
import facebookLogo from "../assets/facebookLogo.jpg";
import appleLogo from "../assets/appleLogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Auth/actions";
import { selectAuth } from "../Redux/Auth/selectors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useSelector(selectAuth);

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  const handleSubmit = (values) => {
    dispatch(login({ loginData: values }));
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-illustration">
          <img src={sportsMsLogo} alt="Login illustration" className="illustration-image" />
        </div>
        <div className="register-form-container">
          <h1 className="register-title">Login</h1>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
              <Form className="register-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input-text"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-container">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="input-text"
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>  
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <div className="forgot-password">
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                </div>

                <button type="submit" className="register-button" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </Form>
            )}
          </Formik>

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
              <a href="">
                <img src={facebookLogo} alt="Facebook" className="facebookLogo" />
              </a>
            </button>
            <button className="social-button apple">
              <img src={appleLogo} alt="Apple" className="appleLogo" />
            </button>
          </div>

          <p className="login-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
