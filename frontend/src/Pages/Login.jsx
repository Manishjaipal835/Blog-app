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

  <>
    <div className="w-full bg-gray-100 py-12 text-center">
      <h1 className="text-4xl font-bold font-serif text-gray-800">
        Welcome Back
      </h1>
      <p className="mt-2 text-gray-600">
        Login to continue writing and reading blogs
      </p>
    </div>

    <div className="w-full flex justify-center py-12 bg-gray-50">
      <div className="w-full max-w-md px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>

          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              autoComplete="off"
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              autoComplete="off"
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-600">
            New user?{" "}
            <span
              onClick={() => navigate("/reg")}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  </>
);
}
export default Login;
