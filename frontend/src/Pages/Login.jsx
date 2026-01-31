import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, LoginCallApi } from "../features/LoginSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.loginUser);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@") || password.length < 4) {
      alert("Please enter valid email and password");
      return;
    }

    dispatch(LoginCallApi({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log("login error from unwrape",err);
        const message =
          typeof err === "string" ? err : err?.message || "Login failed";

        if (message.toLowerCase().includes("register")) {
          navigate("/reg");
        } else {
          alert(message);
        }
      });
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <div className="login-element">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            autoComplete="off"
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </div>

        <div className="login-element">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            autoComplete="off"
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="login-footer">
          New user?{" "}
          <span onClick={() => navigate("/reg")}>Register</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
