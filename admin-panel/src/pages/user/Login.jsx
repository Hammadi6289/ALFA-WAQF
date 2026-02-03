import React, { useEffect, useState } from "react";
import "./Login.css";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";

const Login = () => {
  const [email, setEmail] = useState("hammad6289@gmail.com");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleLogin = () => {
  //   if (!email || !password) return toast.error("Please fill all the fields");
  //   dispatch(login({ email, password }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!email || !password) return toast.error("Please fill all the fields");
    dispatch(login({ email, password }));
  };

  const { success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      toast.success("Logged in successfully");
      navigate("/dashboard");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, navigate, dispatch]);
  return (
    <>
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <h1 className="admin-login-title">Admin Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn button-secondary w-100"
              // onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <Link
            to={"/https://mail.google.com/mail/"}
            className="text-center d-block mt-2"
          >
            Trouble logging in? Please Contact IT Support Team
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
